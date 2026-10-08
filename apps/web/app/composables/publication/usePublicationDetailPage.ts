import { computed } from 'vue'
import {
  createError,
  useAsyncData,
  useHead,
  useRequestURL,
  useRoute,
  useSeoMeta,
} from '#imports'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { usePublicationSource } from '~/composables/publication/usePublicationSource'
import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'
import type { ArticleHeadingBlock } from '~/types/publication'
import { adaptPlainTextArticleContent } from '~/utils/publication/adaptPlainTextArticleContent'
import { parsePositivePage } from '~/utils/query/parsePositivePage'
import { readQueryValue } from '~/utils/query/readQueryValue'

export async function usePublicationDetailPage() {
  const route = useRoute()
  const requestUrl = useRequestURL()
  const publicationSource = usePublicationSource()
  const isPreviewMode = useDeploymentPreview()
  const slug = computed(() => String(route.params.slug))
  const fromPage = computed(() => parsePositivePage(route.query.fromPage) ?? 1)
  const fromPublication = computed(() => readQueryValue(route.query.from))
  const archiveTo = computed(() => ({
    path: '/news',
    query: fromPage.value > 1 ? { page: String(fromPage.value) } : undefined,
    hash: fromPublication.value ? `#publication-${fromPublication.value}` : undefined,
  }))

  const articleRequest = useAsyncData(
    () => `news-${slug.value}`,
    () => publicationSource.getBySlug(slug.value),
  )

  useSeoMeta({
    title: () => articleRequest.data.value?.title,
    description: () => articleRequest.data.value?.lead || articleRequest.data.value?.excerpt || undefined,
  })
  useHead(() => ({
    link: [{ rel: 'canonical', href: new URL(route.path, requestUrl.origin).toString() }],
  }))

  const { data: article, error } = await articleRequest

  if (error.value) {
    const status = error.value.status === ERROR_STATUS.NOT_FOUND
      ? ERROR_STATUS.NOT_FOUND
      : ERROR_STATUS.BAD_GATEWAY

    throw createError({
      status,
      statusText: status === ERROR_STATUS.NOT_FOUND
        ? ERROR_MESSAGES.NEWS_NOT_FOUND
        : ERROR_MESSAGES.NEWS_LOAD_FAILED,
      cause: error.value,
    })
  }

  if (!article.value) {
    throw createError({
      status: ERROR_STATUS.NOT_FOUND,
      statusText: ERROR_MESSAGES.NEWS_NOT_FOUND,
    })
  }

  const articleBlocks = computed(() => {
    const blocks = article.value?.body
    return blocks?.length ? blocks : adaptPlainTextArticleContent(article.value?.content || '')
  })
  const tocItems = computed(() => articleBlocks.value
    .filter((block): block is ArticleHeadingBlock => block.type === 'heading')
    .map(block => ({ id: block.id, label: block.text })))
  const breadcrumbTitle = computed(() => {
    const title = article.value?.title || ''
    return title.length > 72 ? `${title.slice(0, 69)}…` : title
  })
  const relatedArticles = await Promise.all(
    (article.value.relatedSlugs || []).map(relatedSlug => publicationSource.getBySlug(relatedSlug)),
  )

  return {
    archiveTo,
    article,
    articleBlocks,
    breadcrumbTitle,
    isPreviewMode,
    relatedArticles,
    tocItems,
  }
}

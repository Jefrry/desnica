import { computed } from 'vue'
import {
  createError,
  useAsyncData,
  useHead,
  useRequestURL,
  useRoute,
  useRuntimeConfig,
  useSeoMeta,
} from '#imports'
import { usePublicationSource } from '~/composables/publication/usePublicationSource'
import { ERROR_CONTEXT, ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'
import type { ArticleHeadingBlock } from '~/types/publication'
import { renderPublicationMarkdown } from '~/utils/publication/renderPublicationMarkdown'
import { parsePositivePage } from '~/utils/query/parsePositivePage'
import { readQueryValue } from '~/utils/query/readQueryValue'

export async function usePublicationDetailPage() {
  const route = useRoute()
  const requestUrl = useRequestURL()
  const publicationSource = usePublicationSource()
  const cmsBaseUrl = useRuntimeConfig().public.strapiUrl
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
      data: { context: ERROR_CONTEXT.PUBLICATION },
      cause: error.value,
    })
  }

  if (!article.value) {
    throw createError({
      status: ERROR_STATUS.NOT_FOUND,
      statusText: ERROR_MESSAGES.NEWS_NOT_FOUND,
      data: { context: ERROR_CONTEXT.PUBLICATION },
    })
  }

  const articleBlocks = computed(() => {
    const blocks = article.value?.body
    return blocks?.length ? blocks : []
  })
  const articleMarkdown = computed(() => articleBlocks.value.length
    ? undefined
    : renderPublicationMarkdown(article.value?.content || '', cmsBaseUrl))
  const tocItems = computed(() => articleMarkdown.value?.toc ?? articleBlocks.value
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
    articleMarkdown,
    breadcrumbTitle,
    relatedArticles,
    tocItems,
  }
}

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  navigateTo,
  useAsyncData,
  useHead,
  useRequestURL,
  useRoute,
  useSeoMeta,
} from '#imports'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { usePublicationSource } from '~/composables/publication/usePublicationSource'
import type { PublicationPage } from '~/types/publication'
import { parsePositivePage } from '~/utils/query/parsePositivePage'
import { readQueryValue } from '~/utils/query/readQueryValue'

defineOptions({ name: 'NewsIndexPage' })

const PAGE_SIZE = 6
const route = useRoute()
const requestUrl = useRequestURL()
const publicationSource = usePublicationSource()
const isPreviewMode = useDeploymentPreview()
const pendingFocusPage = ref<number>()
const pageAnnouncement = ref('')

const rawPage = computed(() => readQueryValue(route.query.page))
const parsedPage = computed(() => parsePositivePage(route.query.page))
const hasInvalidPageQuery = computed(() => rawPage.value !== undefined && parsedPage.value === undefined)
const requestedPage = computed(() => parsedPage.value ?? 1)

function pageTo(page: number) {
  const query = { ...route.query }
  delete query.page

  if (page > 1) {
    query.page = String(page)
  }

  return {
    path: '/news',
    query,
  }
}

if (hasInvalidPageQuery.value) {
  await navigateTo(pageTo(1), { replace: true })
}

const { data: publicationPage, error, refresh, status } = await useAsyncData(
  () => `publication-archive-${requestedPage.value}`,
  () => publicationSource.list({
    page: requestedPage.value,
    pageSize: PAGE_SIZE,
  }),
)

const visiblePublicationPage = ref<PublicationPage | undefined>(publicationPage.value)
watch(publicationPage, (nextPage) => {
  if (nextPage) visiblePublicationPage.value = nextPage
})

const publications = computed(() => visiblePublicationPage.value?.items ?? [])
const pagination = computed(() => visiblePublicationPage.value?.pagination)
const isMissingPage = computed(() => {
  const metadata = pagination.value
  return Boolean(metadata && requestedPage.value > Math.max(metadata.pageCount, 1))
})
const collectionState = computed<'pending' | 'empty' | 'error' | 'missing-page' | 'success'>(() => {
  if (status.value === 'pending' && !visiblePublicationPage.value) return 'pending'
  if (error.value) return 'error'
  if (isMissingPage.value) return 'missing-page'
  if (!publications.value.length) return 'empty'
  return 'success'
})

const archiveTitle = computed(() => {
  if (isMissingPage.value) return 'Страница архива не найдена'
  return requestedPage.value > 1 ? `Новости — страница ${requestedPage.value}` : 'Новости'
})
const canonicalUrl = computed(() => {
  if (isMissingPage.value) return undefined
  const url = new URL('/news', requestUrl.origin)
  if (requestedPage.value > 1) url.searchParams.set('page', String(requestedPage.value))
  return url.toString()
})

useSeoMeta({
  title: archiveTitle,
  description: 'События Ресурсного центра, полезные материалы и истории изменений.',
})
useHead(() => ({
  link: canonicalUrl.value ? [{ rel: 'canonical', href: canonicalUrl.value }] : [],
}))

watch(
  () => status.value,
  async (nextStatus) => {
    if (
      nextStatus !== 'success'
      || collectionState.value !== 'success'
      || pagination.value?.page !== requestedPage.value
      || pendingFocusPage.value !== requestedPage.value
    ) {
      if (nextStatus === 'success' && collectionState.value !== 'success') {
        pendingFocusPage.value = undefined
      }
      return
    }

    const page = pendingFocusPage.value
    pendingFocusPage.value = undefined
    pageAnnouncement.value = ''
    await nextTick()
    window.requestAnimationFrame(() => {
      pageAnnouncement.value = `Показана страница ${page}`
      document.getElementById('publication-list-heading')?.focus({ preventScroll: true })
    })
  },
)

function handlePageNavigation(page: number) {
  pendingFocusPage.value = page
}

function articleTo(slug: string, documentId: string) {
  return {
    path: `/news/${encodeURIComponent(slug)}`,
    query: {
      fromPage: String(requestedPage.value),
      from: documentId,
    },
  }
}
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Новости' },
        ]"
        class="mb-8"
      />

      <header>
        <h1>Новости</h1>
        <p class="text-intro max-w-[52rem]">
          События Ресурсного центра, полезные материалы и истории изменений.
        </p>
      </header>

      <section
        class="mt-10 tablet:mt-12"
        aria-labelledby="publication-list-heading"
        :aria-busy="status === 'pending' || undefined"
      >
        <h2
          id="publication-list-heading"
          class="sr-only"
          tabindex="-1"
        >
          Список публикаций
        </h2>

        <PublicationCollectionState
          v-if="collectionState !== 'success'"
          :state="collectionState"
          :retrying="status === 'pending'"
          @retry="refresh()"
        />

        <template v-else>
          <p
            v-if="status === 'pending'"
            class="mb-4 text-caption text-muted"
            role="status"
          >
            Загружаем материалы…
          </p>

          <div
            :inert="status === 'pending'"
            :class="status === 'pending' ? 'pointer-events-none opacity-50' : ''"
          >
            <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-3">
              <li
                v-for="publication in publications"
                :id="`publication-${publication.documentId}`"
                :key="publication.documentId"
                class="min-w-0 scroll-mt-28"
              >
                <NewsCard
                  :title="publication.title"
                  :slug="publication.slug"
                  :excerpt="publication.excerpt || ''"
                  :published-at="publication.publishedAt"
                  :media="publication.media || {
                    assetId: `publication-${publication.documentId}`,
                    alt: `Иллюстрация к публикации «${publication.title}»`,
                  }"
                  :to="articleTo(publication.slug, publication.documentId)"
                  :missing-label="isPreviewMode ? 'Демонстрационный материал' : 'Фотография будет добавлена'"
                />
              </li>
            </ul>

            <PublicationPagination
              v-if="pagination"
              :pagination="pagination"
              :page-to="pageTo"
              @navigate="handlePageNavigation"
            />
          </div>
        </template>
      </section>
    </Container>

    <p
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ pageAnnouncement }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { PublicationMedia } from '~/types/publication'
import { formatDate } from '~/utils/formatDate'

defineOptions({ name: 'NewsCard' })

interface Props {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  media: PublicationMedia
  to?: RouteLocationRaw
  missingLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  missingLabel: 'Фотография будет добавлена',
})

const articleTo = computed(() => props.to || `/news/${encodeURIComponent(props.slug)}`)
const readableDate = computed(() => formatDate(props.publishedAt))
</script>

<template>
  <article class="min-w-0 overflow-hidden rounded-card border border-border-subtle bg-surface phone:grid phone:grid-cols-[37%_minmax(0,1fr)] tablet:block">
    <FigureMedia
      :asset-id="media.assetId"
      :src="media.src"
      :alt="media.alt"
      :width="media.width || 1600"
      :height="media.height || 900"
      ratio="var(--news-card-ratio)"
      :focal-point="media.focalPoint"
      :missing-label="missingLabel"
      class="[--news-card-ratio:16/9] [&_[role=img]>span:last-child]:hidden phone:h-full phone:[--news-card-ratio:auto] phone:[&>div]:h-full tablet:h-auto tablet:[--news-card-ratio:16/9] tablet:[&>div]:h-auto"
    />

    <div class="flex min-w-0 flex-col p-4">
      <time
        :datetime="publishedAt"
        class="mb-2 text-caption text-muted"
      >
        {{ readableDate }}
      </time>
      <h3>{{ title }}</h3>
      <p class="mb-4 text-caption text-muted">
        {{ excerpt }}
      </p>
      <NuxtLink
        :to="articleTo"
        class="mt-auto inline-flex items-center gap-2 self-start text-control font-semibold"
        :aria-label="`Читать далее: ${title}`"
      >
        Читать далее
        <svg
          class="size-5 shrink-0"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 10h12m-4-4 4 4-4 4"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>

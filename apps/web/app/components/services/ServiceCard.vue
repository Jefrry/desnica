<script setup lang="ts">
import type { ServiceRoute } from '~/constants/navigation'

defineOptions({ name: 'ServiceCard' })

interface Props {
  assetId: string
  src?: string
  alt: string
  title: string
  description: string
  to: ServiceRoute
}

withDefaults(defineProps<Props>(), {
  src: '',
})
</script>

<template>
  <article class="flex h-full min-w-0 items-center gap-4 overflow-hidden rounded-card border border-border-subtle bg-surface p-3 tablet:block tablet:p-0">
    <FigureMedia
      :asset-id="assetId"
      :src="src"
      :alt="alt"
      :width="1600"
      :height="900"
      ratio="var(--service-card-ratio)"
      class="w-28 shrink-0 [--service-card-ratio:1] [&_[role=img]]:gap-1 [&_[role=img]]:p-2 [&_[role=img]>span:last-child]:sr-only [&_[role=img]>svg]:size-6 [&>div]:rounded-control phone:w-32 tablet:w-full tablet:[--service-card-ratio:16/9] tablet:[&_[role=img]]:gap-2 tablet:[&_[role=img]]:p-4 tablet:[&_[role=img]>span:last-child]:not-sr-only tablet:[&_[role=img]>svg]:size-10 tablet:[&>div]:rounded-none tablet:[&>div]:border-0"
    />

    <div class="min-w-0 tablet:p-4">
      <h3>{{ title }}</h3>
      <p class="mb-3 text-caption text-muted">
        {{ description }}
      </p>
      <NuxtLink
        :to="to"
        class="inline-flex items-center gap-2 text-control font-semibold"
        :aria-label="`Подробнее об услуге: ${title}`"
      >
        Подробнее
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

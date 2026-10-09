<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineOptions({ name: 'PersonCard' })

interface Props {
  assetId: string
  src?: string
  alt: string
  role: string
  name?: string
  description?: string
  to?: RouteLocationRaw
}

withDefaults(defineProps<Props>(), {
  src: '',
  name: '',
  description: '',
  to: undefined,
})
</script>

<template>
  <article class="flex h-full min-w-0 items-center gap-4 rounded-card border border-border-subtle bg-surface p-3 tablet:block tablet:overflow-hidden tablet:p-0">
    <FigureMedia
      :asset-id="assetId"
      :src="src"
      :alt="alt"
      :width="800"
      :height="800"
      ratio="var(--person-card-ratio)"
      class="w-24 shrink-0 [--person-card-ratio:1] [&_[role=img]]:gap-1 [&_[role=img]]:p-2 [&_[role=img]>span:last-child]:sr-only [&_[role=img]>svg]:size-6 tablet:w-full tablet:[--person-card-ratio:4/3] tablet:[&_[role=img]]:gap-2 tablet:[&_[role=img]]:p-4 tablet:[&_[role=img]>span:last-child]:not-sr-only tablet:[&_[role=img]>svg]:size-10 tablet:[&>div]:rounded-none tablet:[&>div]:border-0"
    />

    <div class="min-w-0 tablet:p-4">
      <h3 class="mb-1">
        {{ name || role }}
      </h3>

      <p
        v-if="name"
        class="mb-2 text-caption font-semibold text-muted"
      >
        {{ role }}
      </p>

      <p
        v-if="description"
        class="mb-0 text-caption text-muted"
      >
        {{ description }}
      </p>

      <NuxtLink
        v-if="to"
        :to="to"
        class="mt-3 inline-flex text-control font-semibold"
        :aria-label="`Подробнее: ${name || role}`"
      >
        Подробнее
      </NuxtLink>
    </div>
  </article>
</template>

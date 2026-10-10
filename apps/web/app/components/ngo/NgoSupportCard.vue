<script setup lang="ts">
defineOptions({ name: 'NgoSupportCard' })

interface Props {
  assetId: string
  src?: string
  alt: string
  title: string
  description: string
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
      ratio="var(--ngo-card-ratio)"
      class="w-28 shrink-0 [--ngo-card-ratio:1] [&_[role=img]]:gap-1 [&_[role=img]]:p-2 [&_[role=img]>span:last-child]:sr-only [&_[role=img]>svg]:size-6 [&>div]:rounded-control phone:w-32 tablet:w-full tablet:[--ngo-card-ratio:16/9] tablet:[&_[role=img]]:gap-2 tablet:[&_[role=img]]:p-4 tablet:[&_[role=img]>span:last-child]:not-sr-only tablet:[&_[role=img]>svg]:size-10 tablet:[&>div]:rounded-none tablet:[&>div]:border-0"
    />

    <div class="min-w-0 tablet:p-4">
      <h3>{{ title }}</h3>
      <p class="m-0 text-caption text-muted">
        {{ description }}
      </p>
    </div>
  </article>
</template>

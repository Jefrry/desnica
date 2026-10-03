<script setup lang="ts">
defineOptions({ name: 'RelatedLinkCard' })

interface RelatedMedia {
  assetId: string
  src?: string
  width?: number
  height?: number
}

interface Props {
  to: string
  title: string
  description?: string
  media?: RelatedMedia
}

withDefaults(defineProps<Props>(), {
  description: '',
  media: undefined,
})
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="title"
    class="group flex min-h-control min-w-0 items-center gap-3 rounded-card border border-border-subtle bg-surface p-3 text-ink no-underline transition-colors hover:border-brand hover:bg-surface-accent hover:text-ink hover:no-underline"
  >
    <FigureMedia
      v-if="media"
      :asset-id="media.assetId"
      :src="media.src"
      alt=""
      :width="media.width || 160"
      :height="media.height || 160"
      ratio="1"
      missing-label="Иллюстрация будет добавлена"
      aria-hidden="true"
      class="w-20 shrink-0 [&_[role=img]]:p-2 [&_[role=img]>span]:sr-only [&_[role=img]>svg]:size-6 [&>div]:rounded-control"
    />

    <span class="min-w-0 flex-1">
      <span class="block text-control font-semibold [overflow-wrap:anywhere]">
        {{ title }}
      </span>
      <span
        v-if="description"
        class="mt-1 block text-caption font-normal text-muted [overflow-wrap:anywhere]"
      >
        {{ description }}
      </span>
    </span>

    <svg
      class="size-5 shrink-0 text-brand transition-colors group-hover:text-brand-hover"
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
</template>

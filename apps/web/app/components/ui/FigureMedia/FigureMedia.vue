<script setup lang="ts">
import { useFigureMedia } from './useFigureMedia'

defineOptions({ name: 'FigureMedia' })

interface Props {
  assetId: string
  src?: string
  alt: string
  width: number
  height: number
  ratio?: string | number
  focalPoint?: string
  caption?: string
  loading?: 'eager' | 'lazy'
  missingLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  ratio: undefined,
  focalPoint: '50% 50%',
  caption: '',
  loading: 'lazy',
  missingLabel: 'Фотография будет добавлена',
})

const {
  aspectRatio,
  handleImageError,
  hasImage,
  imageElement,
  missingAccessibleLabel,
} = useFigureMedia(props)
</script>

<template>
  <figure
    class="m-0 min-w-0"
    :data-asset-id="assetId"
  >
    <div
      class="overflow-hidden rounded-card border border-border-subtle bg-surface-subtle"
      :style="{ aspectRatio }"
    >
      <img
        v-if="hasImage"
        ref="imageElement"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading === 'eager' ? 'eager' : 'lazy'"
        decoding="async"
        class="size-full object-cover"
        :style="{ objectPosition: focalPoint }"
        @error="handleImageError"
      >

      <div
        v-else
        class="flex size-full min-w-0 flex-col items-center justify-center gap-2 p-4 text-center text-muted"
        role="img"
        :aria-label="missingAccessibleLabel"
      >
        <svg
          class="size-10 text-border-control"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="34"
            height="30"
            rx="3"
            stroke="currentColor"
            stroke-width="2"
          />
          <circle
            cx="13"
            cy="15"
            r="3"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="m7 30 8-8 5 5 4-4 9 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span
          class="max-w-full break-words text-control font-semibold text-ink"
          aria-hidden="true"
        >{{ missingLabel }}</span>
        <span
          v-if="alt"
          class="max-w-full break-words text-caption"
          aria-hidden="true"
        >{{ alt }}</span>
      </div>
    </div>

    <figcaption
      v-if="caption"
      class="mt-2 text-caption text-muted"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

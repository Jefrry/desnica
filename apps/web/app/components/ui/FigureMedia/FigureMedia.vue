<script setup>
import { useFigureMedia } from './useFigureMedia'

defineOptions({ name: 'FigureMedia' })

const props = defineProps({
  assetId: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
    validator: value => value > 0,
  },
  height: {
    type: Number,
    required: true,
    validator: value => value > 0,
  },
  ratio: {
    type: [String, Number],
    default: undefined,
  },
  focalPoint: {
    type: String,
    default: '50% 50%',
  },
  caption: {
    type: String,
    default: '',
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: value => ['eager', 'lazy'].includes(value),
  },
  missingLabel: {
    type: String,
    default: 'Фотография будет добавлена',
  },
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
        class="flex size-full min-h-40 flex-col items-center justify-center gap-2 p-4 text-center text-muted"
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
          class="text-control font-semibold text-ink"
          aria-hidden="true"
        >{{ missingLabel }}</span>
        <span
          v-if="alt"
          class="text-caption"
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

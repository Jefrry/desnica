<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ProcessSteps' })

type DecorativeIconName = 'building' | 'check' | 'document' | 'education' | 'layers' | 'people' | 'search' | 'settings' | 'target'

interface ProcessStep {
  title: string
  body: string
  assetId?: string
  src?: string
  alt?: string
  width?: number
  height?: number
  focalPoint?: string
  icon?: DecorativeIconName
}

interface Props {
  items:
    | readonly [ProcessStep, ProcessStep, ProcessStep]
    | readonly [ProcessStep, ProcessStep, ProcessStep, ProcessStep]
  variant?: 'compact' | 'with-media'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'compact',
})

const desktopColumns = computed(() => (
  props.items.length === 4
    ? 'desktop:grid-cols-4'
    : 'desktop:grid-cols-3'
))
</script>

<template>
  <ol
    class="m-0 grid list-none gap-6 p-0"
    :class="desktopColumns"
  >
    <li
      v-for="(item, index) in items"
      :key="item.title"
      class="relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 desktop:block"
    >
      <span
        v-if="index < items.length - 1"
        class="absolute bottom-[-1.5rem] left-[1.375rem] top-12 w-px bg-border-subtle desktop:bottom-auto desktop:left-12 desktop:right-[-1.5rem] desktop:top-[1.375rem] desktop:h-px desktop:w-auto"
        aria-hidden="true"
      />

      <span
        class="relative z-10 inline-grid size-11 place-items-center rounded-full bg-surface-accent text-control font-bold text-brand"
        aria-hidden="true"
      >{{ index + 1 }}</span>

      <div class="min-w-0 desktop:mt-3">
        <div class="flex min-w-0 items-start gap-3">
          <DecorativeIcon
            v-if="item.icon"
            :name="item.icon"
            class="mt-0.5 hidden size-6 shrink-0 text-brand tablet:block"
          />
          <h3 class="mb-2 min-w-0 [overflow-wrap:anywhere]">
            {{ item.title }}
          </h3>
        </div>

        <FigureMedia
          v-if="variant === 'with-media'"
          :asset-id="item.assetId || `process-step-${index + 1}`"
          :src="item.src || ''"
          :alt="item.alt || `Иллюстрация к шагу «${item.title}»`"
          :width="item.width || 800"
          :height="item.height || 450"
          ratio="16/9"
          :focal-point="item.focalPoint"
          class="mb-3 [&_[role=img]>span:last-child]:sr-only"
        />

        <p class="m-0 text-caption text-muted">
          {{ item.body }}
        </p>
      </div>
    </li>
  </ol>
</template>

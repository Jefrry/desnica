<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'

defineOptions({ name: 'DocumentRow' })

interface Props {
  id: string
  title: string
  description: string
  href?: string
  readTarget?: string
  format?: string
  bytes?: number
  date?: string
  available?: boolean
  showReadAction?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  href: undefined,
  readTarget: undefined,
  format: undefined,
  bytes: undefined,
  date: undefined,
  available: true,
  showReadAction: true,
})

const route = useRoute()

const readLocation = computed(() => {
  if (!props.available || !props.readTarget) {
    return undefined
  }

  return {
    path: route.path,
    query: {
      ...route.query,
      document: props.id,
    },
    hash: props.readTarget.startsWith('#') ? props.readTarget : `#${props.readTarget}`,
  }
})

const metadata = computed(() => {
  const values: string[] = []

  if (props.format) {
    values.push(props.format)
  }

  if (typeof props.bytes === 'number') {
    values.push(formatBytes(props.bytes))
  }

  if (props.date) {
    values.push(props.date)
  }

  return values
})

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} Б`
  }

  const kilobytes = bytes / 1024

  if (kilobytes < 1024) {
    return `${kilobytes.toLocaleString('ru-RU', { maximumFractionDigits: 1 })} КБ`
  }

  return `${(kilobytes / 1024).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} МБ`
}

</script>

<template>
  <article class="grid min-w-0 gap-4 rounded-card border border-border-subtle bg-surface p-4 tablet:grid-cols-[auto_minmax(0,1fr)] desktop:grid-cols-[auto_minmax(0,1fr)_auto] desktop:items-center">
    <span class="inline-grid size-14 shrink-0 place-items-center rounded-card bg-surface-accent text-brand tablet:size-16">
      <DecorativeIcon
        name="document"
        class="size-8"
      />
    </span>

    <div class="min-w-0">
      <h3 class="mb-1">
        {{ title }}
      </h3>
      <p class="m-0 text-caption text-muted">
        {{ description }}
      </p>
      <p
        v-if="metadata.length"
        class="mt-2 mb-0 text-caption text-muted"
      >
        {{ metadata.join(' · ') }}
      </p>
    </div>

    <div class="flex min-w-0 flex-wrap items-start gap-x-3 gap-y-2 tablet:col-start-2 desktop:col-start-auto">
      <ActionLink
        v-if="showReadAction && readLocation"
        :to="readLocation"
        variant="secondary"
      >
        Читать на сайте
      </ActionLink>
      <ActionLink
        v-else-if="showReadAction"
        variant="secondary"
      >
        Читать на сайте
      </ActionLink>

      <ActionLink
        v-if="href"
        :href="href"
        variant="secondary"
      >
        Скачать {{ format || 'файл' }}
      </ActionLink>
      <ActionLink
        v-else
        variant="secondary"
      >
        Файл пока недоступен
      </ActionLink>
    </div>
  </article>
</template>

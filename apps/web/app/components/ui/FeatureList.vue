<script setup lang="ts">
defineOptions({ name: 'FeatureList' })

type DecorativeIconName = 'building' | 'check' | 'document' | 'education' | 'layers' | 'people' | 'search' | 'settings' | 'target'

interface FeatureItem {
  title: string
  body?: string
  icon?: DecorativeIconName
}

interface Props {
  items: FeatureItem[]
  columns?: 1 | 2
}

withDefaults(defineProps<Props>(), {
  columns: 1,
})
</script>

<template>
  <ul
    class="m-0 grid list-none gap-3 p-0"
    :class="columns === 2 ? 'tablet:grid-cols-2' : undefined"
  >
    <li
      v-for="item in items"
      :key="item.title"
      class="flex min-w-0 items-start gap-3 rounded-card border border-border-subtle bg-surface p-4"
    >
      <span
        class="inline-grid size-11 shrink-0 place-items-center rounded-full bg-surface-accent text-brand"
        aria-hidden="true"
      >
        <DecorativeIcon
          :name="item.icon || 'check'"
          class="size-6"
        />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block text-control font-bold text-ink [overflow-wrap:anywhere]">
          {{ item.title }}
        </span>
        <span
          v-if="item.body"
          class="mt-1 block text-caption text-muted [overflow-wrap:anywhere]"
        >{{ item.body }}</span>
      </span>
    </li>
  </ul>
</template>

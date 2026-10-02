<script setup>
defineOptions({ name: 'FeatureList' })

defineProps({
  items: {
    type: Array,
    required: true,
    validator: items => items.length > 0 && items.every(item => (
      typeof item?.title === 'string'
      && (item.body === undefined || typeof item.body === 'string')
      && (item.icon === undefined || typeof item.icon === 'string')
    )),
  },
  columns: {
    type: Number,
    default: 1,
    validator: value => [1, 2].includes(value),
  },
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

<script setup>
defineOptions({ name: 'UiBreadcrumbs' })

defineProps({
  items: {
    type: Array,
    required: true,
    validator: items => items.length > 0,
  },
  ariaLabel: {
    type: String,
    default: 'Хлебные крошки',
  },
})
</script>

<template>
  <nav
    :aria-label="ariaLabel"
    class="text-caption text-muted"
  >
    <ol class="m-0 flex list-none flex-wrap items-baseline gap-x-2 gap-y-1 p-0">
      <li
        v-for="(item, index) in items"
        :key="`${index}-${item.label}`"
        class="flex min-w-0 items-baseline gap-2"
      >
        <NuxtLink
          v-if="index < items.length - 1 && item.to"
          :to="item.to"
          class="min-w-0 [overflow-wrap:anywhere]"
        >
          {{ item.label }}
        </NuxtLink>

        <span
          v-else
          class="min-w-0 [overflow-wrap:anywhere]"
          :class="index === items.length - 1 ? 'font-semibold text-ink' : ''"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>

        <svg
          v-if="index < items.length - 1"
          class="size-4 shrink-0 self-center text-border-control"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m6 3 5 5-5 5"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </li>
    </ol>
  </nav>
</template>

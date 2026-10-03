<script setup lang="ts">
defineOptions({ name: 'PrincipleList' })

interface PrincipleItem {
  title: string
  body: string
}

defineProps<{
  items: PrincipleItem[]
}>()
</script>

<template>
  <ol class="m-0 grid list-none gap-3 rounded-card bg-surface-accent p-3 phone:p-4 tablet:p-6">
    <li
      v-for="(item, index) in items"
      :key="item.title"
      class="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-card bg-surface p-4 tablet:grid-cols-[2.75rem_minmax(10rem,0.6fr)_minmax(0,1.4fr)] tablet:items-start tablet:gap-x-5"
    >
      <span
        class="inline-grid size-10 place-items-center rounded-full bg-brand text-control font-bold text-white tablet:size-11"
        aria-hidden="true"
      >{{ index + 1 }}</span>
      <h3 class="m-0 self-center [overflow-wrap:anywhere]">
        {{ item.title }}
      </h3>
      <p class="col-start-2 m-0 text-caption text-muted tablet:col-start-3">
        {{ item.body }}
      </p>
    </li>
  </ol>
</template>

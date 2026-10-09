<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineOptions({ name: 'AboutLinkCard' })

defineProps<{
  to: RouteLocationRaw
  title: string
  description: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-label="title"
    class="group flex h-full min-h-control min-w-0 items-center gap-3 rounded-card border border-border-subtle bg-surface p-4 text-ink no-underline transition-colors hover:border-brand hover:bg-surface-accent hover:text-ink hover:no-underline"
  >
    <span class="min-w-0 flex-1">
      <span class="block text-control font-semibold [overflow-wrap:anywhere]">
        {{ title }}
      </span>
      <span class="mt-1 block text-caption font-normal text-muted [overflow-wrap:anywhere]">
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

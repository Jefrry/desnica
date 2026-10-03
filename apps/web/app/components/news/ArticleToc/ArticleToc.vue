<script setup lang="ts">
import type { ArticleTocItem } from './useArticleToc'
import { useArticleToc } from './useArticleToc'

defineOptions({ name: 'ArticleToc' })

interface Props {
  items: ArticleTocItem[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'В этой статье',
})

const {
  handleLinkClick,
  titleId,
} = useArticleToc(props)
</script>

<template>
  <nav
    class="w-full rounded-card bg-surface-accent p-4 desktop:sticky desktop:top-28 desktop:w-64 desktop:self-start"
    :aria-labelledby="titleId"
  >
    <p
      :id="titleId"
      class="mb-3 text-control font-bold text-ink"
    >
      {{ title }}
    </p>
    <ul class="m-0 grid list-none gap-2 p-0">
      <li
        v-for="item in items"
        :key="item.id"
      >
        <a
          :href="`#${encodeURIComponent(item.id)}`"
          class="inline-flex min-h-icon-control items-center gap-2 py-1 text-caption font-semibold"
          @click="handleLinkClick(item.id)"
        >
          <svg
            class="size-4 shrink-0"
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
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

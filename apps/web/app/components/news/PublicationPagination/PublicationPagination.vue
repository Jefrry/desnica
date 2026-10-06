<script setup lang="ts">
import { toRef } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { Pagination } from '~/types/publication'
import { usePublicationPagination } from './usePublicationPagination'

defineOptions({ name: 'PublicationPagination' })

interface Props {
  pagination: Pagination
  pageTo: (page: number) => RouteLocationRaw
}

const props = defineProps<Props>()
const emit = defineEmits<{
  navigate: [page: number]
}>()

const {
  hasNextPage,
  hasPreviousPage,
  isVisible,
  nextPage,
  previousPage,
} = usePublicationPagination(toRef(props, 'pagination'))
</script>

<template>
  <nav
    v-if="isVisible"
    aria-label="Страницы публикаций"
    class="mt-10 flex flex-wrap items-center justify-center gap-2 tablet:mt-12"
  >
    <NuxtLink
      v-if="hasPreviousPage && previousPage"
      :to="pageTo(previousPage)"
      class="inline-flex min-h-control items-center justify-center rounded-control border border-border-subtle px-4 text-control font-semibold no-underline"
      rel="prev"
      @click="emit('navigate', previousPage)"
    >
      <span aria-hidden="true">←</span>
      <span class="ml-2">Назад</span>
    </NuxtLink>
    <span
      v-else
      class="inline-flex min-h-control items-center justify-center rounded-control border border-border-subtle px-4 text-control text-muted"
      aria-disabled="true"
    >
      <span aria-hidden="true">←</span>
      <span class="ml-2">Назад</span>
    </span>

    <NuxtLink
      v-if="hasNextPage && nextPage"
      :to="pageTo(nextPage)"
      class="inline-flex min-h-control items-center justify-center rounded-control border border-border-subtle px-4 text-control font-semibold no-underline"
      rel="next"
      @click="emit('navigate', nextPage)"
    >
      <span>Далее</span>
      <span
        class="ml-2"
        aria-hidden="true"
      >→</span>
    </NuxtLink>
    <span
      v-else
      class="inline-flex min-h-control items-center justify-center rounded-control border border-border-subtle px-4 text-control text-muted"
      aria-disabled="true"
    >
      <span>Далее</span>
      <span
        class="ml-2"
        aria-hidden="true"
      >→</span>
    </span>

    <p class="sr-only">
      Показана страница {{ pagination.page }} из {{ pagination.pageCount }}. Всего публикаций: {{ pagination.total }}, по {{ pagination.pageSize }} на странице.
    </p>
  </nav>
</template>

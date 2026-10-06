import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { Pagination } from '~/types/publication'

export function usePublicationPagination(pagination: MaybeRefOrGetter<Pagination>) {
  const hasPreviousPage = computed(() => toValue(pagination).page > 1)
  const hasNextPage = computed(() => {
    const { page, pageCount } = toValue(pagination)
    return page < pageCount
  })

  const previousPage = computed(() => {
    const { page } = toValue(pagination)
    return hasPreviousPage.value ? page - 1 : undefined
  })

  const nextPage = computed(() => {
    const { page } = toValue(pagination)
    return hasNextPage.value ? page + 1 : undefined
  })

  const isVisible = computed(() => toValue(pagination).pageCount > 1)

  return {
    hasNextPage,
    hasPreviousPage,
    isVisible,
    nextPage,
    previousPage,
  }
}

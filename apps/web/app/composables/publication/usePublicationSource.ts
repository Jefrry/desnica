import type { PublicationSource } from '~/types/publication'
import { useNewsApi } from '~/api/newsApi'

export function usePublicationSource(): PublicationSource {
  const { getPublishedNews, getNewsBySlug } = useNewsApi()

  return {
    list: getPublishedNews,
    getBySlug: getNewsBySlug,
  }
}

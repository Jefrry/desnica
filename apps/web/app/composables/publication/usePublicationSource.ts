import type { PublicationSource } from '~/types/publication'
import { useNewsApi } from '~/api/newsApi'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { previewPublicationSource } from '~/sources/previewPublicationSource'

export function usePublicationSource(): PublicationSource {
  const isPreviewMode = useDeploymentPreview()

  if (isPreviewMode.value) {
    return previewPublicationSource
  }

  const { getNewsBySlug, getPublishedNews } = useNewsApi()

  return {
    list: getPublishedNews,
    getBySlug: getNewsBySlug,
  }
}

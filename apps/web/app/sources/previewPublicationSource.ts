import type { PublicationSource } from '~/types/publication'
import { previewPublications } from '~/constants/mocks/previewPublications'
import { NewsNotFoundError } from '~/api/newsApi'

export const previewPublicationSource: PublicationSource = {
  async list({ page, pageSize }) {
    const total = previewPublications.length
    const pageCount = Math.ceil(total / pageSize)
    const offset = (page - 1) * pageSize

    return {
      items: previewPublications.slice(offset, offset + pageSize),
      pagination: { page, pageSize, pageCount, total },
    }
  },

  async getBySlug(slug) {
    const publication = previewPublications.find(item => item.slug === slug)

    if (!publication) {
      throw new NewsNotFoundError(slug)
    }

    return publication
  },
}

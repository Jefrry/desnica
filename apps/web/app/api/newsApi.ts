import type {
  CmsPublication,
  Publication,
  PublicationListResponse,
  PublicationListOptions,
  PublicationPage,
  PublicationResponse,
} from '~/types/publication'
import { ApiError, baseApi, getCmsBaseUrl } from '~/utils/api'
import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'

export class NewsNotFoundError extends ApiError {
  constructor(slug: string, options?: ErrorOptions) {
    super(ERROR_MESSAGES.NEWS_NOT_FOUND_BY_SLUG(slug), ERROR_STATUS.NOT_FOUND, options)
    this.name = 'NewsNotFoundError'
  }
}

export function useNewsApi() {
  const cmsBaseUrl = getCmsBaseUrl()

  // Changes data structure from cms to landing format
  function formatPublication(article: CmsPublication): Publication {
    const { cover, ...publication } = article

    if (!cover) {
      return publication
    }

    return {
      ...publication,
      media: {
        assetId: cover.documentId || `publication-${article.documentId}`,
        src: new URL(cover.url, `${cmsBaseUrl.replace(/\/$/, '')}/`).toString(),
        alt: cover.alternativeText || `Иллюстрация к публикации «${article.title}»`,
        width: cover.width,
        height: cover.height,
      },
    }
  }

  async function getPublishedNews({ page, pageSize }: PublicationListOptions): Promise<PublicationPage> {
    const response = await baseApi<PublicationListResponse>({
      path: 'news',
      query: {
        sort: 'publishedAt:desc',
        populate: 'cover',
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
      },
    })

    return {
      items: response.data.map(formatPublication),
      pagination: response.meta.pagination,
    }
  }

  async function getNewsBySlug(slug: string): Promise<Publication> {
    try {
      const response = await baseApi<PublicationResponse>({
        path: `news/${encodeURIComponent(slug)}`,
        query: {
          populate: 'cover',
        },
      })

      return formatPublication(response.data)
    }
    catch (error: unknown) {
      if (error instanceof ApiError && error.status === ERROR_STATUS.NOT_FOUND) {
        throw new NewsNotFoundError(slug, { cause: error })
      }

      throw error
    }
  }

  return {
    getPublishedNews,
    getNewsBySlug,
  }
}

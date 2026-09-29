import type {
  NewsArticle,
  NewsArticleResponse,
  NewsListResponse,
} from '~/types/news.ts'
import { ApiError, baseApi } from '~/utils/api'
import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'

export class NewsNotFoundError extends ApiError {
  constructor(slug: string, options?: ErrorOptions) {
    super(ERROR_MESSAGES.NEWS_NOT_FOUND_BY_SLUG(slug), ERROR_STATUS.NOT_FOUND, options)
    this.name = 'NewsNotFoundError'
  }
}

export function useNewsApi() {
  async function getPublishedNews(): Promise<NewsArticle[]> {
    const response = await baseApi<NewsListResponse>({
      path: 'news',
      query: {
        sort: 'publishedAt:desc',
      },
    })

    return response.data
  }

  async function getNewsBySlug(slug: string): Promise<NewsArticle> {
    try {
      const response = await baseApi<NewsArticleResponse>({
        path: `news/${encodeURIComponent(slug)}`,
      })

      return response.data
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

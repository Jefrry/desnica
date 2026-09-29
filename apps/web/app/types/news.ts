export interface NewsArticle {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface NewsListResponse {
  data: NewsArticle[]
  meta: {
    pagination: Pagination
  }
}

export interface NewsArticleResponse {
  data: NewsArticle
  meta: Record<string, never>
}

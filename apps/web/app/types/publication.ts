export interface Publication {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  lead?: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  media?: PublicationMedia
  author?: string
  body?: readonly ArticleBlock[]
  relatedSlugs?: readonly string[]
}

export interface PublicationMedia {
  assetId: string
  src?: string
  alt: string
  width?: number
  height?: number
  focalPoint?: string
  caption?: string
}

export interface ArticleParagraphBlock {
  type: 'paragraph'
  text: string
}

export interface ArticleHeadingBlock {
  type: 'heading'
  id: string
  text: string
}

export interface ArticleImageBlock {
  type: 'image'
  media: PublicationMedia
}

export interface ArticleQuoteBlock {
  type: 'quote'
  text: string
  citation?: string
}

export interface ArticleListBlock {
  type: 'list'
  items: readonly string[]
  ordered?: boolean
}

export type ArticleBlock =
  | ArticleParagraphBlock
  | ArticleHeadingBlock
  | ArticleImageBlock
  | ArticleQuoteBlock
  | ArticleListBlock

export interface CmsPublicationMedia {
  documentId?: string
  url: string
  alternativeText?: string | null
  width?: number
  height?: number
}

export interface CmsPublication extends Omit<Publication, 'media'> {
  cover?: CmsPublicationMedia | null
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface PublicationListResponse {
  data: CmsPublication[]
  meta: {
    pagination: Pagination
  }
}

export interface PublicationResponse {
  data: CmsPublication
  meta: Record<string, never>
}

export interface PublicationPage {
  items: Publication[]
  pagination: Pagination
}

export interface PublicationListOptions {
  page: number
  pageSize: number
}

export interface PublicationSource {
  list(options: PublicationListOptions): Promise<PublicationPage>
  getBySlug(slug: string): Promise<Publication>
}

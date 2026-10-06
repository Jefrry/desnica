export interface Publication {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  media?: PublicationMedia
}

export interface PublicationMedia {
  assetId: string
  src?: string
  alt: string
  width?: number
  height?: number
  focalPoint?: string
}

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

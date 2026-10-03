import type { ContentResource } from '~/types/content/contentSource'

export interface PhotoAsset {
  assetId: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  focalPoint?: string
}

export type PhotoContent = ContentResource<PhotoAsset>

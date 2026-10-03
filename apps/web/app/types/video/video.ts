import type { ContentResource } from '~/types/content/contentSource'
import type { PhotoContent } from '~/types/photo/photo'

export interface VideoTrack {
  kind: 'captions' | 'audio-description'
  src: string
  language: string
  label: string
}

export interface VideoAsset {
  src: string
  mimeType: string
  title: string
  poster?: PhotoContent
  tracks?: readonly VideoTrack[]
  transcript?: ContentResource<string>
}

export type VideoContent = ContentResource<VideoAsset>

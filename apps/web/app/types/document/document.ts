import type { ContentResource } from '~/types/content/contentSource'

export interface DocumentSection {
  id: string
  title?: string
  paragraphs: readonly string[]
}

export interface DocumentText {
  sections: readonly DocumentSection[]
}

export interface DocumentFile {
  href: string
  fileName: string
  format: string
  sizeLabel: string
}

export interface DocumentContent {
  id: string
  title: string
  textVersion: ContentResource<DocumentText>
  file: ContentResource<DocumentFile>
}

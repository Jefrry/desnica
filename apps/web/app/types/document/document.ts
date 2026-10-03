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
  description: string
  textVersion: ContentResource<DocumentText>
  file: ContentResource<DocumentFile>
}

export interface ReportFeature {
  title: string
  body: string
  icon: 'people' | 'layers' | 'document'
}

export interface ReportCover {
  assetId: string
  alt: string
}

export interface AnnualReport {
  year: string
  features: readonly ReportFeature[]
  cover: ContentResource<ReportCover>
  textVersion: ContentResource<DocumentText>
  file: ContentResource<DocumentFile>
}

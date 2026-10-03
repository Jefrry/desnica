import type {
  ConfirmedContentSource,
  DemonstrationContentSource,
  UnavailableContent,
} from '~/types/content/contentSource'
import type { DocumentSection } from '~/types/document/document'

export interface ApprovedLegalText {
  approval: 'approved'
  title: string
  sections: readonly DocumentSection[]
}

export interface DraftLegalText {
  approval: 'draft'
  title: string
  sections: readonly DocumentSection[]
}

export type LegalTextContent =
  | {
    availability: 'available'
    source: ConfirmedContentSource
    data: ApprovedLegalText
  }
  | {
    availability: 'available'
    source: DemonstrationContentSource
    data: DraftLegalText
  }
  | UnavailableContent

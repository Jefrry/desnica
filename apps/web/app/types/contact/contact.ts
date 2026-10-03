import type {
  ConfirmedContentSource,
  DemonstrationContentSource,
  UnavailableContent,
} from '~/types/content/contentSource'

interface ContactChannel {
  kind: 'address' | 'email' | 'phone' | 'schedule'
  label: string
  value: string
}

export interface ConfirmedContactChannel extends ContactChannel {
  href?: string
}

export interface DemonstrationContactChannel extends ContactChannel {
  href?: never
}

export interface ContactDetails<T extends ContactChannel> {
  channels: readonly T[]
  directions?: string
}

export type ContactContent =
  | {
    availability: 'available'
    source: ConfirmedContentSource
    data: ContactDetails<ConfirmedContactChannel>
  }
  | {
    availability: 'available'
    source: DemonstrationContentSource
    data: ContactDetails<DemonstrationContactChannel>
  }
  | UnavailableContent

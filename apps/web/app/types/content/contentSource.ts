export const DEMONSTRATION_CONTENT_LABEL = 'Демонстрационное наполнение' as const

export const DEMONSTRATION_CONTENT_DISCLAIMER
  = 'Материал предназначен для проверки макета и не подтверждает реальные факты, юридические сведения или выполненные действия.' as const

export interface ConfirmedContentSource {
  kind: 'confirmed'
}

export interface DemonstrationContentSource {
  kind: 'demonstration'
  label: typeof DEMONSTRATION_CONTENT_LABEL
  disclaimer: typeof DEMONSTRATION_CONTENT_DISCLAIMER
}

export const CONFIRMED_CONTENT_SOURCE: ConfirmedContentSource = {
  kind: 'confirmed',
}

export const DEMONSTRATION_CONTENT_SOURCE: DemonstrationContentSource = {
  kind: 'demonstration',
  label: DEMONSTRATION_CONTENT_LABEL,
  disclaimer: DEMONSTRATION_CONTENT_DISCLAIMER,
}

interface AvailableContent<T> {
  availability: 'available'
  source: ConfirmedContentSource | DemonstrationContentSource
  data: T
}

export interface UnavailableContent {
  availability: 'unavailable'
  message: string
}

export type ContentResource<T> = AvailableContent<T> | UnavailableContent

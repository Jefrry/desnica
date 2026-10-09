import type { ContactContent } from '~/types/contact/contact'

export const UNCONFIRMED_CONTACT_CHANNELS = [
  { kind: 'phone', label: 'Телефон', value: 'Телефон — уточняется', href: undefined },
  { kind: 'email', label: 'Эл. почта', value: 'Эл. почта — уточняется', href: undefined },
  { kind: 'address', label: 'Адрес', value: 'Адрес — уточняется', href: undefined },
  { kind: 'schedule', label: 'Часы работы', value: 'Часы работы — уточняются', href: undefined },
] as const

export const productionContactContent: ContactContent = {
  availability: 'unavailable',
  message: 'Контактные сведения уточняются.',
}

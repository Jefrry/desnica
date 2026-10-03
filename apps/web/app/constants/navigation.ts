export const NAVIGATION_ITEMS = [
  {
    key: 'about',
    label: 'О нас',
    to: '/about',
    dropdownWidth: '17.5rem',
    children: [
      { label: 'Наша миссия', to: '/about/mission' },
      { label: 'Уставные документы', to: '/about/documents' },
      { label: 'Годовая отчётность', to: '/about/reports' },
    ],
  },
  {
    key: 'services',
    label: 'Услуги',
    to: '/services',
    dropdownWidth: '22.5rem',
    children: [
      { label: 'Разработка локальных документов', to: '/services/local-documents' },
      { label: 'Проектирование 10 раздела ОДИ', to: '/services/odi' },
      { label: 'Согласование проектов', to: '/services/project-review' },
      { label: 'Паспорт доступности', to: '/services/accessibility-passport' },
    ],
  },
  { key: 'training', label: 'Обучение', to: '/training', children: [] },
  { key: 'news', label: 'Новости', to: '/news', children: [] },
  { key: 'ngo', label: 'Работа НКО', to: '/ngo', children: [] },
  { key: 'contacts', label: 'Контакты', to: '/contacts', children: [] },
] as const

export const SERVICE_ROUTES = [
  '/services/local-documents',
  '/services/odi',
  '/services/project-review',
  '/services/accessibility-passport',
] as const

export type ServiceRoute = typeof SERVICE_ROUTES[number]

export function isServiceRoute(value: string): value is ServiceRoute {
  return SERVICE_ROUTES.some(route => route === value)
}

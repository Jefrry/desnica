export const documentDefinitions = [
  {
    id: 'charter',
    title: 'Устав Ресурсного центра',
    description: 'Основные положения о целях и организации работы.',
  },
  {
    id: 'registration',
    title: 'Свидетельство о регистрации',
    description: 'Сведения о государственной регистрации организации.',
  },
  {
    id: 'requisites',
    title: 'Реквизиты организации',
    description: 'Информация для официальных обращений и взаимодействия.',
  },
] as const

export const reportFeatures = [
  {
    title: 'Программы',
    body: 'Описание основных направлений работы за выбранный год.',
    icon: 'layers',
  },
  {
    title: 'Команда и партнёры',
    body: 'Участники совместной работы и их вклад.',
    icon: 'people',
  },
  {
    title: 'Использование средств',
    body: 'Информация о привлечённых ресурсах и их использовании.',
    icon: 'document',
  },
] as const

export const reportYears = ['2025', '2024', '2023'] as const

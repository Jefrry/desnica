export const previewAccessibilityPassportPreparation = [
  'Общая информация об объекте',
  'Планы помещений при наличии',
  'Сведения о действующих ограничениях',
  'Контакт для рабочего взаимодействия',
] as const

export const previewAccessibilityPassportFaqItems = [
  {
    id: 'assessment-duration',
    question: 'Сколько времени занимает обследование?',
    answer: 'Срок зависит от размера и сложности объекта, исходных материалов и согласованного объёма работ.',
  },
  {
    id: 'report-contents',
    question: 'Что входит в отчёт?',
    answer: 'Содержание обсуждается до начала работы и связано с задачей обследования.',
  },
  {
    id: 'employee-presence',
    question: 'Нужно ли присутствие сотрудников?',
    answer: 'Участие сотрудника, знакомого с объектом, помогает уточнить порядок работы и маршруты посетителей.',
  },
  {
    id: 'partial-assessment',
    question: 'Можно ли обследовать часть здания?',
    answer: 'Объём можно обсудить, учитывая задачу и связь выбранной части с остальным маршрутом посетителя.',
  },
]

export const previewTrainingPrograms = [
  {
    id: 'accessibility-basics',
    title: 'Основы доступной среды',
    audience: 'Для специалистов',
    description: 'Базовые знания о потребностях посетителей и принципах доступности в повседневной работе.',
    assetId: 'training-workshop',
    alt: 'Ведущий проводит занятие для группы',
  },
  {
    id: 'communication',
    title: 'Общение без барьеров',
    audience: 'Для специалистов и сотрудников фронт-офиса',
    description: 'Практические навыки уважительного и понятного взаимодействия в разных ситуациях.',
    assetId: 'service-conversation',
    alt: 'Специалисты обсуждают рабочую ситуацию',
  },
  {
    id: 'inclusive-service',
    title: 'Инклюзивный сервис',
    audience: 'Для сотрудников сферы услуг',
    description: 'Как учитывать потребности разных посетителей и делать сервис удобнее.',
    assetId: 'inclusive-service',
    alt: 'Сотрудник встречает посетителя',
  },
] as const

export const previewTrainingFormats = [
  {
    title: 'Очно',
    description: 'Обсуждаем задачи и практические ситуации вместе с командой на площадке.',
    assetId: 'training-workshop',
    alt: 'Команда участвует в очном занятии',
    icon: 'people' as const,
  },
  {
    title: 'Онлайн',
    description: 'Встречаемся дистанционно и работаем с примерами в доступном формате.',
    assetId: 'online-training',
    alt: 'Участник подключается к онлайн-занятию',
    icon: 'education' as const,
  },
] as const


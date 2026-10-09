import type { ServiceDefinition } from '~/types/service/service'

export const previewServices: readonly ServiceDefinition[] = [
  {
    id: 'local-documents',
    title: 'Разработка локальных документов',
    description: 'Помогаем организовать инклюзивное оказание услуг с учётом потребностей посетителей.',
    lead: 'Помогаем организовать инклюзивное оказание услуг с учётом потребностей людей с инвалидностью. Подготовим понятные документы для работы команды.',
    to: '/services/local-documents',
    assetId: 'local-papers',
    alt: 'Специалист работает с документами',
  },
  {
    id: 'odi',
    title: 'Проектирование 10 раздела ОДИ',
    description: 'Разрабатываем проектные решения по обеспечению доступности зданий и помещений.',
    lead: 'Решения по обеспечению доступа людей с инвалидностью.',
    to: '/services/odi',
    assetId: 'odi-plan',
    alt: 'Специалисты обсуждают план помещения',
  },
  {
    id: 'project-review',
    title: 'Согласование проектов',
    description: 'Обсуждаем доступность проектных решений и готовим рекомендации.',
    lead: 'Экспертный диалог и проверка проектных решений с точки зрения доступности.',
    to: '/services/project-review',
    assetId: 'approval-meeting',
    alt: 'Команда обсуждает проектные решения',
  },
  {
    id: 'accessibility-passport',
    title: 'Паспорт доступности',
    description: 'Помогаем обследовать объект и подготовить материалы о его доступности.',
    lead: 'Помогаем разобраться, насколько объект удобен для посетителей.',
    to: '/services/accessibility-passport',
    assetId: 'passport-document',
    alt: 'Материалы обследования доступности',
  },
]

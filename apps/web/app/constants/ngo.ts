import type { DocumentContent, DocumentFile, DocumentText } from '~/types/document/document'
import { DEMONSTRATION_CONTENT_SOURCE, unavailableContent } from '~/types/content/contentSource'

export const ngoSupportAreas = [
  {
    id: 'consultations',
    title: 'Консультации',
    description: 'Обсуждение вопросов доступности и организации работы.',
    assetId: 'ngo-consultation',
    alt: 'Консультант обсуждает вопрос с участником',
  },
  {
    id: 'experience-exchange',
    title: 'Обмен опытом',
    description: 'Встречи и практические обсуждения для команд.',
    assetId: 'ngo-exchange',
    alt: 'Группа обменивается опытом за общим столом',
  },
  {
    id: 'joint-initiatives',
    title: 'Совместные инициативы',
    description: 'Развитие идей и партнёрских проектов.',
    assetId: 'ngo-initiatives',
    alt: 'Команда планирует совместную инициативу',
  },
] as const

const ngoMaterialDefinitions = [
  {
    id: 'ngo-guide',
    title: 'Руководство по созданию инклюзивной среды',
    description: 'Практические рекомендации для некоммерческих организаций.',
  },
  {
    id: 'ngo-checklist',
    title: 'Чек-лист доступности мероприятий',
    description: 'Вопросы для подготовки и проверки доступности мероприятия.',
  },
  {
    id: 'ngo-practices',
    title: 'Примеры практик НКО',
    description: 'Подходы к совместной работе и развитию социальных инициатив.',
  },
] as const

export const productionNgoMaterials: readonly DocumentContent[] = ngoMaterialDefinitions.map(material => ({
  ...material,
  textVersion: unavailableContent<DocumentText>('Текстовая версия пока не опубликована.'),
  file: unavailableContent<DocumentFile>('Файл пока не добавлен.'),
}))

const previewFiles = {
  'ngo-guide': {
    href: '/materials/ngo-guide.txt',
    fileName: 'ngo-guide.txt',
    format: 'TXT',
    sizeLabel: '738 Б',
  },
  'ngo-checklist': {
    href: '/materials/ngo-checklist.txt',
    fileName: 'ngo-checklist.txt',
    format: 'TXT',
    sizeLabel: '657 Б',
  },
  'ngo-practices': {
    href: '/materials/ngo-practices.txt',
    fileName: 'ngo-practices.txt',
    format: 'TXT',
    sizeLabel: '666 Б',
  },
} as const satisfies Record<typeof ngoMaterialDefinitions[number]['id'], DocumentFile>

export const previewNgoMaterials: readonly DocumentContent[] = ngoMaterialDefinitions.map(material => ({
  ...material,
  textVersion: unavailableContent<DocumentText>('Текстовая версия на сайте пока не опубликована.'),
  file: {
    availability: 'available',
    source: DEMONSTRATION_CONTENT_SOURCE,
    data: previewFiles[material.id],
  },
}))


import type {
  AnnualReport,
  DocumentContent,
  DocumentFile,
  DocumentText,
  ReportCover,
} from '~/types/document/document'
import { unavailableContent } from '~/types/content/contentSource'

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

const missingDocumentFile = () => unavailableContent<DocumentFile>('Файл пока не добавлен')

export const productionDocuments: readonly DocumentContent[] = documentDefinitions.map(document => ({
  ...document,
  textVersion: unavailableContent<DocumentText>('Текстовая версия будет опубликована после подтверждения содержания.'),
  file: missingDocumentFile(),
}))

function createProductionReport(year: string): AnnualReport {
  return {
    year,
    features: reportFeatures,
    cover: unavailableContent<ReportCover>('Обложка отчёта пока не добавлена'),
    textVersion: unavailableContent<DocumentText>('Подтверждённая текстовая версия отчёта пока не опубликована.'),
    file: missingDocumentFile(),
  }
}

export const productionReports: readonly AnnualReport[] = reportYears.map(createProductionReport)

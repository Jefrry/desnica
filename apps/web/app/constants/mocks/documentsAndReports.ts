import type {
  AnnualReport,
  DocumentContent,
  DocumentFile,
  DocumentSection,
  DocumentText,
  ReportCover,
} from '~/types/document/document'
import type { ContentResource } from '~/types/content/contentSource'
import { DEMONSTRATION_CONTENT_SOURCE } from '~/types/content/contentSource'
import {
  documentDefinitions,
  reportFeatures,
  reportYears,
} from '~/constants/documentsAndReports'

function unavailable<T>(message: string): ContentResource<T> {
  return {
    availability: 'unavailable',
    message,
  }
}

function demonstrationText(sections: readonly DocumentSection[]): ContentResource<DocumentText> {
  return {
    availability: 'available',
    source: DEMONSTRATION_CONTENT_SOURCE,
    data: { sections },
  }
}

function demonstrationCover(year: string): ContentResource<ReportCover> {
  return {
    availability: 'available',
    source: DEMONSTRATION_CONTENT_SOURCE,
    data: {
      assetId: 'report-cover-2025',
      alt: `Демонстрационная обложка годового отчёта за ${year} год`,
    },
  }
}

const missingDocumentFile = () => unavailable<DocumentFile>('Файл пока не добавлен')

export const previewDocuments: readonly DocumentContent[] = [
  {
    ...documentDefinitions[0],
    textVersion: demonstrationText([
      {
        id: 'charter-purpose',
        paragraphs: [
          'Этот блок показывает, как посетитель сможет прочитать документ прямо на сайте. Разделы, заголовки и абзацы представлены обычным текстом, который можно увеличить, выделить и прочитать с помощью программы экранного доступа.',
        ],
      },
      {
        id: 'charter-publication',
        title: 'Публикация документа',
        paragraphs: [
          'В опубликованной версии здесь размещается утверждённый текст устава с указанием даты и редакции. Содержание должно совпадать с официальным документом. Если текст обновляется, посетителю должна быть понятна актуальная версия.',
        ],
      },
      {
        id: 'charter-structure',
        title: 'Структура и приложения',
        paragraphs: [
          'Для удобства длинный документ делится на разделы с оглавлением. При наличии приложения рядом размещаются понятная ссылка, формат и действительный размер файла.',
        ],
      },
    ]),
    file: missingDocumentFile(),
  },
  {
    ...documentDefinitions[1],
    textVersion: demonstrationText([
      {
        id: 'registration-status',
        paragraphs: ['Документ о регистрации будет добавлен после подтверждения данных.'],
      },
    ]),
    file: missingDocumentFile(),
  },
  {
    ...documentDefinitions[2],
    textVersion: demonstrationText([
      {
        id: 'requisites-status',
        paragraphs: ['Реквизиты уточняются.'],
      },
    ]),
    file: missingDocumentFile(),
  },
]

function createPreviewReport(year: string): AnnualReport {
  return {
    year,
    features: reportFeatures,
    cover: demonstrationCover(year),
    textVersion: demonstrationText([
      {
        id: `report-${year}-summary`,
        paragraphs: [
          `Демонстрационная структура отчёта за ${year} год. Здесь будут сведения о программах, команде и использовании средств. Подтверждённые данные и файл пока не добавлены.`,
        ],
      },
    ]),
    file: missingDocumentFile(),
  }
}

export const previewReports: readonly AnnualReport[] = reportYears.map(createPreviewReport)

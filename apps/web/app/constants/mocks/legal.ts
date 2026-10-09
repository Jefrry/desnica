import { DEMONSTRATION_CONTENT_SOURCE } from '~/types/content/contentSource'
import type { LegalTextContent } from '~/types/legal/legalText'

export const previewLegalText: LegalTextContent = {
  availability: 'available',
  source: DEMONSTRATION_CONTENT_SOURCE,
  data: {
    approval: 'draft',
    title: 'Правовая информация',
    sections: [
      {
        id: 'personal-data',
        title: 'Обработка персональных данных',
        paragraphs: [
          'Информация об обработке персональных данных готовится к публикации.',
        ],
      },
    ],
  },
}

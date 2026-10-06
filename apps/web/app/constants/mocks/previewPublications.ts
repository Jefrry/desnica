import type { Publication } from '~/types/publication'

interface PreviewPublicationSeed {
  documentId: string
  slug: string
  publishedAt: string
  title: string
  excerpt: string
  assetId: string
}

const previewPublicationSeeds: PreviewPublicationSeed[] = [
  { documentId: 'N01', slug: 'accessibility-dialogue', publishedAt: '2026-09-24', title: 'Доступная среда начинается с диалога', excerpt: 'Обсуждаем, как вместе создавать инклюзивную среду и учитывать опыт разных людей.', assetId: 'news-dialogue' },
  { documentId: 'N02', slug: 'equal-opportunities-learning', publishedAt: '2026-09-18', title: 'Учимся создавать равные возможности', excerpt: 'Разбираем практические ситуации на занятии для НКО и специалистов.', assetId: 'news-learning' },
  { documentId: 'N03', slug: 'ngo-from-idea-to-action', publishedAt: '2026-09-10', title: 'Поддержка НКО: от идеи к действию', excerpt: 'Рассказываем о подходах, которые помогают развивать социальные инициативы.', assetId: 'news-ngo' },
  { documentId: 'N04', slug: 'prepare-for-assessment', publishedAt: '2026-09-05', title: 'Как подготовиться к обследованию объекта', excerpt: 'Какие сведения и материалы полезно собрать перед обсуждением доступности.', assetId: 'entrance-assessment' },
  { documentId: 'N05', slug: 'inclusion-principles', publishedAt: '2026-09-03', title: 'Знакомимся с принципами инклюзии', excerpt: 'Простые объяснения и примеры уважительного взаимодействия.', assetId: 'training-workshop' },
  { documentId: 'N06', slug: 'team-that-helps', publishedAt: '2026-09-01', title: 'Команда, которая помогает', excerpt: 'Знакомимся с ролями специалистов и подходом к совместной работе.', assetId: 'news-team' },
  { documentId: 'N07', slug: 'visitor-route', publishedAt: '2026-08-28', title: 'Смотрим на маршрут глазами посетителя', excerpt: 'Обсуждаем последовательность действий от входа до получения услуги.', assetId: 'accessible-entrance' },
  { documentId: 'N08', slug: 'clear-information', publishedAt: '2026-08-24', title: 'Понятная информация для каждого', excerpt: 'Как структура сообщения помогает посетителю найти нужное.', assetId: 'local-papers' },
  { documentId: 'N09', slug: 'shared-experience', publishedAt: '2026-08-20', title: 'Обмен опытом между командами', excerpt: 'Почему полезно обсуждать удачные решения и возникающие вопросы.', assetId: 'ngo-exchange' },
  { documentId: 'N10', slug: 'training-questions', publishedAt: '2026-08-15', title: 'Вопросы, с которых начинается обучение', excerpt: 'Определяем задачи команды до выбора программы.', assetId: 'training-workshop' },
  { documentId: 'N11', slug: 'project-discussion', publishedAt: '2026-08-10', title: 'Совместное обсуждение проекта', excerpt: 'Собираем разные точки зрения для работы над доступностью.', assetId: 'planning-session' },
  { documentId: 'N12', slug: 'partnership-start', publishedAt: '2026-08-05', title: 'Первый шаг к сотрудничеству', excerpt: 'Готовим краткое описание инициативы и ожидаемого результата.', assetId: 'ngo-initiatives' },
]

export const previewPublications: Publication[] = previewPublicationSeeds.map((publication, index) => ({
  id: index + 1,
  documentId: publication.documentId,
  title: publication.title,
  slug: publication.slug,
  excerpt: publication.excerpt,
  content: publication.excerpt,
  createdAt: `${publication.publishedAt}T09:00:00.000Z`,
  updatedAt: `${publication.publishedAt}T09:00:00.000Z`,
  publishedAt: `${publication.publishedAt}T09:00:00.000Z`,
  media: {
    assetId: publication.assetId,
    alt: `Иллюстрация к публикации «${publication.title}»`,
  },
}))

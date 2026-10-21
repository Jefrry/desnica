import type { Core } from '@strapi/strapi';
import { calendarDate } from '../utils/publicationDate';

const NEWS_UID = 'api::news.news' as const;

export async function backfillPublicationDates(strapi: Core.Strapi): Promise<void> {
  const missing = await strapi.db.query(NEWS_UID).findMany({
    where: { publicationDate: { $null: true } },
    select: ['id', 'documentId', 'publishedAt', 'createdAt'],
  });
  if (!missing.length) return;

  // Draft and published versions must inherit the same existing public date.
  const published = await strapi.db.query(NEWS_UID).findMany({
    where: {
      documentId: { $in: [...new Set(missing.map(entry => entry.documentId))] },
      publishedAt: { $notNull: true },
    },
    select: ['documentId', 'publishedAt'],
  });
  const dates = new Map(published.map(entry => [entry.documentId, entry.publishedAt]));
  const { tableName, attributes } = strapi.db.metadata.get(NEWS_UID);
  const attribute = attributes.publicationDate;
  if (!('columnName' in attribute) || !attribute.columnName) {
    throw new Error('Publication date database column is missing');
  }
  const column = attribute.columnName;

  // Use the database directly to preserve system timestamps and publication state.
  await strapi.db.transaction(async ({ trx }) => {
    for (const entry of missing) {
      await strapi.db.getConnection(tableName).transacting(trx)
        .where('id', entry.id)
        .whereNull(column)
        .update({
          [column]: calendarDate(
            dates.get(entry.documentId) ?? entry.publishedAt ?? entry.createdAt,
          ),
        });
    }
  });
  strapi.log.info(`Filled publication dates for ${missing.length} existing news versions`);
}

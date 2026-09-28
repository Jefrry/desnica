import { nextAvailableSlug, slugify } from '../../../../utils/slug';

const NEWS_UID = 'api::news.news' as const;

type LifecycleEvent = {
  params: {
    data: Record<string, unknown>;
    where?: Record<string, unknown>;
  };
};

const getCurrentDocumentId = async (event: LifecycleEvent): Promise<string | undefined> => {
  if (typeof event.params.data.documentId === 'string') {
    return event.params.data.documentId;
  }

  const id = event.params.where?.id;
  if (typeof id !== 'number' && typeof id !== 'string') {
    return undefined;
  }

  const current = await strapi.db.query(NEWS_UID).findOne({
    where: { id },
    select: ['documentId'],
  });

  return current?.documentId;
};

const assignUniqueSlug = async (event: LifecycleEvent, source: string): Promise<void> => {
  const baseSlug = slugify(source);
  if (!baseSlug) {
    throw new Error('Slug must contain at least one letter or digit');
  }

  const currentDocumentId = await getCurrentDocumentId(event);
  const matches = await strapi.db.query(NEWS_UID).findMany({
    where: {
      slug: { $startsWith: baseSlug },
    },
    select: ['slug', 'documentId'],
  });
  const occupiedSlugs = matches
    .filter((entry) => entry.documentId !== currentDocumentId)
    .map((entry) => entry.slug)
    .filter((slug): slug is string => typeof slug === 'string');

  event.params.data.slug = nextAvailableSlug(baseSlug, occupiedSlugs);
};

export default {
  async beforeCreate(event: LifecycleEvent) {
    const { data } = event.params;
    const source = typeof data.slug === 'string' && data.slug.trim()
      ? data.slug
      : data.title;

    if (typeof source === 'string') {
      await assignUniqueSlug(event, source);
    }
  },

  async beforeUpdate(event: LifecycleEvent) {
    const { data } = event.params;

    // A title-only edit intentionally leaves an existing public URL unchanged.
    if (typeof data.slug === 'string') {
      await assignUniqueSlug(event, data.slug);
    }
  },
};

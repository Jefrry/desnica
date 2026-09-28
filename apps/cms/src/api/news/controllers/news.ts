import { factories } from '@strapi/strapi';

const NEWS_UID = 'api::news.news' as const;

export default factories.createCoreController(NEWS_UID, ({ strapi }) => ({
  async find(ctx) {
    await this.validateQuery!(ctx);
    const query = await this.sanitizeQuery!(ctx) as Record<string, unknown>;
    const { results, pagination } = await strapi.service(NEWS_UID).find({
      ...query,
      status: 'published',
    } as never);
    const data = await this.sanitizeOutput!(results, ctx);

    return this.transformResponse!(data, { pagination });
  },

  async findBySlug(ctx) {
    await this.validateQuery!(ctx);
    const query = await this.sanitizeQuery!(ctx) as Record<string, unknown>;
    const { results } = await strapi.service(NEWS_UID).find({
      ...query,
      filters: {
        ...((query.filters as Record<string, unknown> | undefined) ?? {}),
        slug: ctx.params.slug,
      },
      status: 'published',
      pagination: {
        page: 1,
        pageSize: 1,
      },
    } as never);

    const entity = results[0];
    if (!entity) {
      return ctx.notFound('News article not found');
    }

    const data = await this.sanitizeOutput!(entity, ctx);
    return this.transformResponse!(data);
  },
}));

import type { Core } from '@strapi/strapi';
import { configureAuthorRole } from './roles/author';
import { slugify } from './utils/slug';

const PUBLIC_NEWS_ACTIONS = [
  'api::news.news.find',
  'api::news.news.findBySlug',
];

type PublicPermission = {
  id: number;
  action: string;
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      if (context.uid !== 'api::news.news' || context.action !== 'create') {
        return next();
      }

      const { data } = context.params;
      if (!data) {
        return next();
      }

      if ((!data.slug || !String(data.slug).trim()) && typeof data.title === 'string') {
        data.slug = slugify(data.title);
      }

      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await configureAuthorRole(strapi);

    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
      populate: ['permissions'],
    });

    if (!role) {
      strapi.log.warn('Public role was not found; News permissions were not configured');
      return;
    }

    const newsPermissions = role.permissions.filter((permission: PublicPermission) =>
      permission.action.startsWith('api::news.news.'),
    );
    const actions = new Set(newsPermissions.map((permission: PublicPermission) => permission.action));

    await Promise.all(
      newsPermissions
        .filter((permission: PublicPermission) => !PUBLIC_NEWS_ACTIONS.includes(permission.action))
        .map((permission: PublicPermission) =>
          strapi.db.query('plugin::users-permissions.permission').delete({
            where: { id: permission.id },
          }),
        ),
    );

    await Promise.all(
      PUBLIC_NEWS_ACTIONS
        .filter((action) => !actions.has(action))
        .map((action) =>
          strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: role.id },
          }),
        ),
    );
  },
};

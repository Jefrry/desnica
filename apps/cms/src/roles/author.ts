import type { Core } from '@strapi/strapi';

const AUTHOR_ROLE = {
  name: 'Автор',
  code: 'strapi-author',
  description:
    'Авторы могут работать со статьями всех авторов, использовать общие медиафайлы и загружать собственные.',
};

const NEWS_UID = 'api::news.news';
const AUTHOR_NEWS_ACTIONS = [
  'plugin::content-manager.explorer.create',
  'plugin::content-manager.explorer.read',
  'plugin::content-manager.explorer.update',
  'plugin::content-manager.explorer.publish',
];
const AUTHOR_MEDIA_ACTIONS = [
  'plugin::upload.read',
  'plugin::upload.assets.create',
];

type AdminPermission = {
  action: string;
  subject: string | null;
  [key: string]: unknown;
};

export async function configureAuthorRole(strapi: Core.Strapi) {
  const roleService = strapi.service('admin::role');
  const permissionService = strapi.service('admin::permission');
  const contentTypeService = strapi.service('admin::content-type');
  let role = await roleService.findOne({ code: AUTHOR_ROLE.code });

  if (!role) {
    role = await roleService.findOne({ name: 'Author' });
  }

  if (!role) {
    strapi.log.warn('Default Author role was not found; News permissions were not configured');
    return;
  }

  if (role.name !== AUTHOR_ROLE.name || role.description !== AUTHOR_ROLE.description) {
    role = await roleService.update(
      { id: role.id },
      {
        name: AUTHOR_ROLE.name,
        description: AUTHOR_ROLE.description,
      },
    );
  }

  const existingPermissions = (await permissionService.findMany({
    where: { role: { id: role.id } },
    populate: ['role'],
  })) as AdminPermission[];
  const otherPermissions = existingPermissions.filter(
    (permission) =>
      (permission.subject !== NEWS_UID || !AUTHOR_NEWS_ACTIONS.includes(permission.action)) &&
      !AUTHOR_MEDIA_ACTIONS.includes(permission.action),
  );
  const newsActions = permissionService.actionProvider
    .values()
    .filter((action: { actionId: string }) => AUTHOR_NEWS_ACTIONS.includes(action.actionId));
  const newsPermissions = contentTypeService
    .getPermissionsWithNestedFields(newsActions)
    .filter((permission: { subject: string | null }) => permission.subject === NEWS_UID)
    .map((permission: object) => ({ ...permission, conditions: [] }));
  const mediaPermissions = AUTHOR_MEDIA_ACTIONS.map((action) => ({ action, conditions: [] }));

  await roleService.assignPermissions(role.id, [
    ...otherPermissions,
    ...newsPermissions,
    ...mediaPermissions,
  ]);
}

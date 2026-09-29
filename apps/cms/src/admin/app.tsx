import { russianTranslations } from './localization/ru';

const ADMIN_LANGUAGE_STORAGE_KEY = 'strapi-admin-language';
const DEFAULT_ADMIN_LOCALE = 'ru';

export default {
  config: {
    locales: [DEFAULT_ADMIN_LOCALE],
    translations: {
      [DEFAULT_ADMIN_LOCALE]: russianTranslations,
    },
  },
  bootstrap() {
    window.localStorage.setItem(ADMIN_LANGUAGE_STORAGE_KEY, DEFAULT_ADMIN_LOCALE);
    document.documentElement.lang = DEFAULT_ADMIN_LOCALE;
  },
};

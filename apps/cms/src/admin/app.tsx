const ADMIN_LANGUAGE_STORAGE_KEY = 'strapi-admin-language';
const DEFAULT_ADMIN_LOCALE = 'ru';

export default {
  config: {
    locales: [DEFAULT_ADMIN_LOCALE],
  },
  bootstrap() {
    if (!window.localStorage.getItem(ADMIN_LANGUAGE_STORAGE_KEY)) {
      window.localStorage.setItem(ADMIN_LANGUAGE_STORAGE_KEY, DEFAULT_ADMIN_LOCALE);
      document.documentElement.lang = DEFAULT_ADMIN_LOCALE;
    }
  },
};

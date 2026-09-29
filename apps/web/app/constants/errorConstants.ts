export const ERROR_STATUS = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_GATEWAY: 502,
} as const

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  NEWS_NOT_FOUND: 'Новость не найдена',
  NEWS_LIST_LOAD_FAILED: 'Не удалось загрузить новости',
  NEWS_LOAD_FAILED: 'Не удалось получить новость',
  PAGE_NOT_FOUND: 'Страница не найдена',
  PAGE_LOAD_FAILED: 'Не удалось загрузить страницу',
  MISSING_NEWS_DESCRIPTION: 'Возможно, новость была удалена или ещё не опубликована.',
  NEWS_SERVICE_FAILED: 'При обращении к сервису новостей произошла ошибка.',
  API_REQUEST_FAILED: (status: number) => `API request failed with status ${status}`,
  NEWS_NOT_FOUND_BY_SLUG: (slug: string) => `Новость «${slug}» не найдена`,
} as const

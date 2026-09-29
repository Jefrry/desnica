# Desnica

Базовый pnpm-only monorepo с двумя приложениями:

- `apps/web` — Nuxt 4 frontend;
- `apps/cms` — Strapi 5 backend.

Сайт, дизайн, content types и другие CMS-модели в этот каркас не входят.

## Структура манифестов

- корневой `package.json` управляет общими командами monorepo и инструментами
  разработки;
- `apps/web/package.json` содержит только зависимости и команды Nuxt;
- `apps/cms/package.json` содержит только зависимости и команды Strapi;
- `pnpm-workspace.yaml` объединяет приложения в workspace;
- единый корневой `pnpm-lock.yaml` фиксирует зависимости всего monorepo.

Зависимости приложений намеренно не переносятся в корневой манифест.

## Требования

- Node.js 22–26;
- pnpm 11+.

Для контейнерного запуска нужен Docker с Compose v2.

## Установка

```bash
pnpm install
Copy-Item apps/cms/.env.example apps/cms/.env
```

Замените тестовые секреты в `apps/cms/.env`. Корневой
`.env.example` содержит сводный список переменных обоих приложений.

## Разработка

Запустить Nuxt и Strapi одновременно:

```bash
pnpm dev
```

- Nuxt: http://localhost:3000
- Strapi: http://localhost:1337/admin

`NUXT_STRAPI_URL` задаёт адрес Strapi для SSR, а
`NUXT_PUBLIC_STRAPI_URL` — адрес, доступный браузеру. В Docker Compose серверный
адрес автоматически указывает на сервис `cms`.

Первый запуск Strapi предложит создать локального администратора.

Отдельный запуск приложения:

```bash
pnpm --filter @desnica/web dev
pnpm --filter @desnica/cms dev
```

## Docker Compose

Локально стек можно запустить без дополнительной настройки (значения по умолчанию
предназначены только для разработки):

```bash
docker compose build
docker compose up -d
docker compose ps
```

- Nuxt: http://localhost:3000
- Strapi: http://localhost:1337/admin
- PostgreSQL доступен сервисам во внутренней сети Compose.

Данные PostgreSQL хранятся в именованном volume `postgres_data`, а загруженные
в Strapi файлы — в `cms_uploads`. Обычный `docker compose down` и пересоздание
контейнеров не удаляют эти данные. Команда `docker compose down -v` удаляет оба
volume вместе с данными.

Перед production-запуском скопируйте `.env.example` в `.env`, замените все
секреты и пароль базы длинными случайными значениями, задайте публичные URL и,
если TLS завершается на reverse proxy, установите `IS_PROXIED=true`. База данных
на порт хоста намеренно не публикуется.

Остановить стек:

```bash
docker compose down
```

## Проверки

```bash
pnpm lint
pnpm typecheck
pnpm build
```

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

Первый запуск Strapi предложит создать локального администратора.

Отдельный запуск приложения:

```bash
pnpm --filter @desnica/web dev
pnpm --filter @desnica/cms dev
```

## Проверки

```bash
pnpm lint
pnpm typecheck
pnpm build
```

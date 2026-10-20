# Desnica

Базовый pnpm-only monorepo с двумя приложениями:

- `apps/web` — Nuxt 4 frontend;
- `apps/cms` — Strapi 5 backend.

Публикации на главной, в архиве и на страницах статей загружаются из Strapi.
Остальное демонстрационное наполнение использует локальные моки.

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

Публикации берутся только из CMS: черновики не показываются, при отсутствии
опубликованных статей список пуст, при ошибке CMS отображается ошибка без
подстановки моков. Чтобы добавить статью, откройте Content Manager → Статьи
в админке Strapi, заполните запись и нажмите Publish.
Демонстрационные материалы сохраняют свои пометки, форма не отправляет реальные
обращения. Индексация заблокирована независимо от источника содержимого.

Первый запуск Strapi предложит создать локального администратора.

Отдельный запуск приложения:

```bash
pnpm --filter @desnica/web dev
pnpm --filter @desnica/cms dev
```

## Docker Compose

Для запуска на сервере по IP следуйте [инструкции развёртывания](docs/hosting.md).
Для локального запуска с автоматически созданными секретами:

```bash
node scripts/setup-server.mjs localhost
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

Генератор не перезаписывает существующий `.env`. Compose требует явно заданные
секреты и пароль БД; небезопасных значений по умолчанию больше нет.
Если `.env` уже существует, заполните секреты и публичные URL вручную.
При TLS на reverse proxy установите `IS_PROXIED=true`.
База данных на порт хоста не публикуется.

По умолчанию оба сервиса возвращают `X-Robots-Tag: noindex`, в том числе для
статических файлов. `robots.txt` разрешает обход, чтобы поисковик мог прочитать
этот заголовок. Это запрет индексации для соблюдающих его поисковиков, а не
ограничение доступа. Чтобы позднее разрешить индексацию сайта, установите
`WEB_INDEXING_ALLOWED=true` в `.env` и пересоздайте контейнер `web`.
Для CMS есть отдельный `CMS_INDEXING_ALLOWED`, который рекомендуется оставить
`false`. Вне Docker используются `NUXT_INDEXING_ALLOWED` и `INDEXING_ALLOWED`
соответственно.

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

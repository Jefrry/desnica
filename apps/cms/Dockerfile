# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS build

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV DATABASE_CLIENT=postgres
ENV STRAPI_TELEMETRY_DISABLED=true

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY apps/cms/package.json apps/cms/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter @desnica/cms...

COPY apps/cms apps/cms

RUN pnpm --filter @desnica/cms build && \
    pnpm --filter @desnica/cms deploy --prod --legacy /prod/cms && \
    cp -R apps/cms/dist /prod/cms/dist

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV STRAPI_TELEMETRY_DISABLED=true

WORKDIR /app

COPY --from=build --chown=node:node /prod/cms ./

RUN mkdir -p public/uploads && chown -R node:node public/uploads

USER node

EXPOSE 1337

HEALTHCHECK --interval=10s --timeout=3s --start-period=60s --retries=10 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:1337/_health').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"]

CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]

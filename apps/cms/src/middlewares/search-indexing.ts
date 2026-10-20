import type { Core } from '@strapi/strapi';

const middleware: Core.MiddlewareFactory<{ allowed: boolean }> = (config) => {
  return async (ctx, next) => {
    if (!config.allowed) {
      ctx.set('X-Robots-Tag', 'noindex');
    }

    await next();
  };
};

export default middleware;

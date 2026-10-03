import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: '%s — Ресурсный центр',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  runtimeConfig: {
    strapiUrl: process.env.NUXT_STRAPI_URL || 'http://localhost:1337',
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
})

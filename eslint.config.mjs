import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.strapi/**',
      '**/.cache/**',
      '**/.tmp/**',
      '**/build/**',
      '**/coverage/**',
      '**/dist/**',
      'apps/cms/src/admin/*.example.*',
      'apps/cms/types/generated/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]

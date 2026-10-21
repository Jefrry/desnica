import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { build } from 'esbuild'
import type { usePublicationDetailPage } from '../app/composables/publication/usePublicationDetailPage.ts'

// Nuxt supplies these framework services in production. Keep the publication
// source, HTTP adapter and renderer real; substitute only Nuxt and the network.
const runtime = `
import { ref } from 'vue'
export const useRoute = () => ({ params: { slug: 'markdown-check' }, query: { fromPage: '2', from: 'check' }, path: '/news/markdown-check' })
export const useRequestURL = () => new URL('https://site.example.org/news/markdown-check')
export const useRuntimeConfig = () => ({ strapiUrl: 'https://cms.example.org', public: { strapiUrl: 'https://cms.example.org' } })
export const useHead = () => {}
export const useSeoMeta = () => {}
export const createError = (options) => Object.assign(new Error(options.statusText), options)
export async function useAsyncData(key, handler) {
  try { return { data: ref(await handler()), error: ref(null) } }
  catch (error) { return { data: ref(null), error: ref(error) } }
}
`

async function loadDetailPage(): Promise<typeof usePublicationDetailPage> {
  const result = await build({
    entryPoints: [fileURLToPath(new URL('../app/composables/publication/usePublicationDetailPage.ts', import.meta.url))],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    write: false,
    define: { 'import.meta.server': 'true' },
    alias: { '~': fileURLToPath(new URL('../app', import.meta.url)) },
    plugins: [{
      name: 'nuxt-test-runtime',
      setup(build) {
        build.onResolve({ filter: /^#imports$/ }, () => ({ path: '#imports', namespace: 'nuxt' }))
        build.onLoad({ filter: /.*/, namespace: 'nuxt' }, () => ({ contents: runtime, resolveDir: fileURLToPath(new URL('..', import.meta.url)) }))
      },
    }],
  })
  const module = { exports: {} as { usePublicationDetailPage: typeof usePublicationDetailPage } }
  new Function('require', 'module', 'exports', result.outputFiles[0]!.text)(createRequire(import.meta.url), module, module.exports)
  return module.exports.usePublicationDetailPage
}

test('CMS publication reaches the detail page as sanitized Markdown and matching navigation', async (t) => {
  const content = '# Раздел\n\n**слово** и *курсив*\n\n# Раздел\n\n![Фото](/uploads/check.jpg)\n\n<h2 onclick="alert(1)">Подраздел</h2><script>alert(1)</script><a href="javascript:alert(1)">ссылка</a>'
  const publication = {
    id: 1, documentId: 'check', slug: 'markdown-check', title: '**Заголовок**',
    excerpt: '*Анонс*', content, publishedAt: '2026-10-21T00:00:00Z',
    createdAt: '2026-10-21T00:00:00Z', updatedAt: '2026-10-21T00:00:00Z',
    cover: { url: '/uploads/cover.jpg', alternativeText: 'Обложка' },
  }
  t.mock.method(globalThis, 'fetch', async (url: string) => {
    assert.equal(url, 'https://cms.example.org/api/news/markdown-check?populate=cover')
    return Response.json({ data: publication, meta: {} })
  })
  const detail = await (await loadDetailPage())()
  assert.equal(detail.article.value?.content, content)
  assert.equal(detail.article.value?.title, '**Заголовок**')
  assert.equal(detail.article.value?.excerpt, '*Анонс*')
  assert.equal(detail.article.value?.media?.src, 'https://cms.example.org/uploads/cover.jpg')
  assert.deepEqual(detail.articleBlocks.value, [])
  assert.match(detail.articleMarkdown.value!.html, /<strong>слово<\/strong> и <em>курсив<\/em>/)
  assert.doesNotMatch(detail.articleMarkdown.value!.html, /\*\*слово\*\*|<h1\b|<script|onclick|javascript:/)
  assert.match(detail.articleMarkdown.value!.html, /src="https:\/\/cms.example.org\/uploads\/check.jpg"/)
  assert.deepEqual(detail.tocItems.value, [{ id: 'раздел', label: 'Раздел' }, { id: 'раздел-2', label: 'Раздел' }])
  for (const item of detail.tocItems.value) assert.ok(detail.articleMarkdown.value!.html.includes(`<h2 id="${item.id}">`))
  assert.deepEqual(detail.archiveTo.value, { path: '/news', query: { page: '2' }, hash: '#publication-check' })
})

test('missing publications and CMS failures remain errors instead of demonstration content', async (t) => {
  const detailPage = await loadDetailPage()
  for (const [cmsStatus, pageStatus] of [[404, 404], [503, 502]]) {
    const fetch = t.mock.method(globalThis, 'fetch', async () => Response.json({ error: { message: 'private CMS detail' } }, { status: cmsStatus }))
    await assert.rejects(detailPage, (error: Error & { status?: number }) => {
      assert.equal(error.status, pageStatus)
      assert.doesNotMatch(error.message, /private CMS detail/)
      return true
    })
    fetch.mock.restore()
  }
})

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'
import { renderPublicationMarkdown } from '../app/utils/publication/renderPublicationMarkdown.ts'

test('publication matches the installed Strapi preview on the shared acceptance corpus', async () => {
  const cmsRequire = createRequire(new URL('../../cms/package.json', import.meta.url))
  const strapiRequire = createRequire(cmsRequire.resolve('@strapi/strapi/package.json'))
  const manager = dirname(strapiRequire.resolve('@strapi/content-manager/package.json'))
  const previewUtils = join(manager, 'dist/admin/pages/EditView/components/FormInputs/Wysiwyg/utils')
  const bundle = await build({
    stdin: {
      contents: `export { md } from './mdRenderer.mjs'; export { sanitize } from './sanitizer.mjs'`,
      resolveDir: previewUtils,
    },
    bundle: true, platform: 'browser', format: 'iife', globalName: 'strapiPreview', write: false,
    loader: { '.css': 'empty' },
  })
  const browser = new JSDOM('', { runScripts: 'outside-only', url: 'https://cms.example.org' })
  try {
    browser.window.eval(bundle.outputFiles[0]!.text)
    const content = await readFile(new URL('./fixtures/publication-markdown.md', import.meta.url), 'utf8')
    browser.window.document.body.textContent = content
    const preview = browser.window.eval(`strapiPreview.sanitize(strapiPreview.md.render(document.body.textContent.replaceAll('\\\\n', '\\n')))`)
    const actual = renderPublicationMarkdown(content, 'https://cms.example.org')
    const expectedBody = browser.window.document.createElement('div')
    expectedBody.innerHTML = preview
    // The agreed differences: heading levels, CMS-relative images and no players.
    for (const element of expectedBody.querySelectorAll('iframe, video, audio, source, track, object, embed')) element.remove()
    const headings = [...expectedBody.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    for (const heading of headings) {
      const replacement = browser.window.document.createElement(`h${Math.min(Number(heading.tagName.slice(1)) + 1, 6)}`)
      replacement.innerHTML = heading.innerHTML
      heading.replaceWith(replacement)
    }
    for (const image of expectedBody.querySelectorAll('img[src]')) image.setAttribute('src', new URL(image.getAttribute('src')!, 'https://cms.example.org').href)
    const actualBody = browser.window.document.createElement('div')
    actualBody.innerHTML = actual.html
    for (const heading of actualBody.querySelectorAll('h2,h3,h4,h5,h6')) heading.removeAttribute('id')
    assert.equal(actualBody.innerHTML, expectedBody.innerHTML)
    assert.deepEqual(actual.toc, [
      { id: 'раздел-один', label: 'Раздел один' },
      { id: 'раздел-один-2', label: 'Раздел один' },
      { id: 'html-заголовок', label: 'HTML заголовок' },
    ])
  }
  finally { browser.window.close() }
})

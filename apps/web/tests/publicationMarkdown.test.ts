import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'
import { renderPublicationMarkdown } from '../app/utils/publication/renderPublicationMarkdown.ts'

const cmsBaseUrl = 'https://cms.example.org'

test('publication preserves nested inline formatting and Strapi line breaks', () => {
  const { html, toc } = renderPublicationMarkdown('**Важно и *полезно***\\nСледующая строка', cmsBaseUrl)
  assert.equal(html, '<p><strong>Важно и <em>полезно</em></strong><br>\nСледующая строка</p>\n')
  assert.deepEqual(toc, [])
})

test('publication supports the Strapi Markdown extensions and code highlighting', () => {
  const { html } = renderPublicationMarkdown(`*[HTML]: Hyper Text Markup Language

HTML :smile: ~~старое~~ ++новое++ ==важное== H~2~O x^2^

Термин
: Определение

::: warning
Осторожно
:::

::: tip
Совет
:::

Сноска[^note]

[^note]: Пояснение

\`\`\`js
const answer = 42
\`\`\``, cmsBaseUrl)
  for (const fragment of [
    '<abbr title="Hyper Text Markup Language">HTML</abbr>', '😄', '<s>старое</s>',
    '<ins>новое</ins>', '<mark>важное</mark>', '<sub>2</sub>', '<sup>2</sup>',
    '<dl>', '<dt>Термин</dt>', '<dd>Определение</dd>',
    '<div class="warning">', '<div class="tip">',
    '<sup class="footnote-ref"><span>[1]</span></sup>',
    '<span class="footnote-backref">↩︎</span>', 'hljs-keyword',
  ]) assert.ok(html.includes(fragment), fragment)
  assert.doesNotMatch(html, /href="#fn/)
})

test('publication normalizes Markdown and HTML headings and derives H2 navigation from the same body', () => {
  const content = '## Ранее\n\n# Привет, **мир**!\n\n<h1>Привет, <em>мир</em>!</h1>\n<h5>Пять</h5><h6>Шесть</h6>'
  const result = renderPublicationMarkdown(content, cmsBaseUrl)
  assert.deepEqual(result.toc, [
    { id: 'привет-мир', label: 'Привет, мир!' },
    { id: 'привет-мир-2', label: 'Привет, мир!' },
  ])
  assert.match(result.html, /<h3 id="ранее">Ранее<\/h3>/)
  assert.match(result.html, /<h2 id="привет-мир">Привет, <strong>мир<\/strong>!<\/h2>/)
  assert.match(result.html, /<h6 id="пять">Пять<\/h6><h6 id="шесть">Шесть<\/h6>/)
  assert.doesNotMatch(result.html, /<h1\b/)
  assert.deepEqual(renderPublicationMarkdown(content, cmsBaseUrl), result)
})

test('publication keeps H2–H6 without H1 and avoids collisions with numbered and empty headings', () => {
  const result = renderPublicationMarkdown('## Тема\n\n## Тема\n\n## Тема-2\n\n## !!!\n\n## ???\n\n### Тема\n\n###### Конец', cmsBaseUrl)
  assert.deepEqual(result.toc, [
    { id: 'тема', label: 'Тема' },
    { id: 'тема-2', label: 'Тема' },
    { id: 'тема-2-2', label: 'Тема-2' },
    { id: 'section', label: '!!!' },
    { id: 'section-2', label: '???' },
  ])
  assert.match(result.html, /<h3 id="тема-3">Тема<\/h3>/)
  assert.match(result.html, /<h6 id="конец">Конец<\/h6>/)
})

test('publication preserves word boundaries in headings with HTML line breaks', () => {
  const { html, toc } = renderPublicationMarkdown('<h2>До<br>после</h2>', cmsBaseUrl)
  assert.deepEqual(toc, [{ id: 'до-после', label: 'До после' }])
  assert.match(html, /<h2 id="до-после">До<br>после<\/h2>/)
})

test('publication supports core Markdown and ordinary text without changing the source', () => {
  const { html } = renderPublicationMarkdown(`Обычный текст & символы

> Цитата

---

1. Первый
   - Вложенный
2. Второй

| Название | Значение |
| --- | --- |
| Код | \`<script>\` |

https://example.org "кавычки" (c)`, cmsBaseUrl)
  for (const fragment of ['Обычный текст &amp; символы', '<blockquote>', '<hr>', '<ol>', '<ul>', '<table>', '<th>Название</th>', '<code>&lt;script&gt;</code>', 'href="https://example.org"', '©', '“кавычки”']) {
    assert.ok(html.includes(fragment), fragment)
  }
  assert.deepEqual(renderPublicationMarkdown('', cmsBaseUrl), { html: '', toc: [] })
})

test('publication retains safe HTML but removes executable content, unsafe URLs and video players', () => {
  const { html, toc } = renderPublicationMarkdown(`<h2 onclick="alert(1)">Безопасно <em>читать</em></h2>
<script><h1>Опасно</h1></script>
<a href="javascript:alert(1)">Ссылка</a>
<img src="data:image/png;base64,AAAA" onerror="alert(1)">
<img src="jav&#x61;script:alert(1)">
<iframe src="https://example.org"></iframe>
<video controls src="https://example.org/movie.mp4"><source src="movie.mp4"></video>
<audio src="sound.mp3"></audio>
<p style="color:red" data-secret="value">Текст</p>`, cmsBaseUrl)
  assert.match(html, /<h2 id="безопасно-читать">Безопасно <em>читать<\/em><\/h2>/)
  assert.doesNotMatch(html, /script|onerror|onclick|javascript:|data:|iframe|video|source|audio|style=|data-secret/i)
  assert.deepEqual(toc, [{ id: 'безопасно-читать', label: 'Безопасно читать' }])
})

test('publication resolves Markdown and HTML images against CMS while preserving links and anchors', () => {
  const { html } = renderPublicationMarkdown(`![Фото](/uploads/photo.jpg)
<img src="uploads/second.jpg" alt="Второе">
<img src="//media.example.org/photo.jpg">
[Раздел](#раздел) [Сайт](https://example.org) [Путь](/contacts)
![Внешнее](https://cdn.example.org/photo.jpg)`, cmsBaseUrl)
  assert.match(html, /src="https:\/\/cms.example.org\/uploads\/photo.jpg"/)
  assert.match(html, /src="https:\/\/cms.example.org\/uploads\/second.jpg"/)
  assert.match(html, /src="https:\/\/media.example.org\/photo.jpg"/)
  assert.match(html, /src="https:\/\/cdn.example.org\/photo.jpg"/)
  assert.match(html, /href="#%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB"/)
  assert.match(html, /href="https:\/\/example.org"/)
  assert.match(html, /href="\/contacts"/)
})

test('publication HTML and navigation match in server and browser bundles', async () => {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL('../app/utils/publication/renderPublicationMarkdown.ts', import.meta.url))],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'publicationMarkdown',
    write: false,
  })
  const browser = new JSDOM('', { runScripts: 'outside-only', url: 'https://site.example.org' })
  try {
    browser.window.eval(bundle.outputFiles[0]!.text)
    const content = await readFile(new URL('./fixtures/publication-markdown.md', import.meta.url), 'utf8')
      + '\n\n<svg><a href="javascript:alert(1)">опасно</a></svg>'
    browser.window.document.body.textContent = content
    const actual = browser.window.eval(`publicationMarkdown.renderPublicationMarkdown(document.body.textContent, 'https://cms.example.org')`)
    assert.deepEqual(JSON.parse(JSON.stringify(actual)), renderPublicationMarkdown(content, cmsBaseUrl))
  }
  finally {
    browser.window.close()
  }
})

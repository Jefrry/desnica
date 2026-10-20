import MarkdownIt from 'markdown-it'
import DOMPurify from 'isomorphic-dompurify'
import highlight from 'highlight.js'
import abbr from 'markdown-it-abbr'
import container from 'markdown-it-container'
import deflist from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import sub from 'markdown-it-sub'
import sup from 'markdown-it-sup'
import { parseFragment, serialize, type DefaultTreeAdapterMap } from 'parse5'

export interface PublicationMarkdown {
  html: string
  toc: { id: string, label: string }[]
}

const markdown: MarkdownIt = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight(code, language) {
    if (language && language !== 'auto' && highlight.getLanguage(language)) {
      return `<pre class="hljs language-${markdown.utils.escapeHtml(language.toLowerCase())}"><code>${highlight.highlight(code, { language, ignoreIllegals: true }).value}</code></pre>`
    }
    if (language === 'auto') {
      const result = highlight.highlightAuto(code)
      return `<pre class="hljs language-${markdown.utils.escapeHtml(result.language ?? '')}"><code>${result.value}</code></pre>`
    }
    return `<pre class="hljs"><code>${markdown.utils.escapeHtml(code)}</code></pre>`
  },
})
  .use(abbr).use(container, 'warning').use(container, 'tip').use(deflist)
  .use(emoji).use(footnote).use(ins).use(mark).use(sub).use(sup)

// Match Strapi's preview: footnotes are displayed without navigation links.
markdown.renderer.rules.footnote_ref = (tokens, index, options, env, renderer) => {
  const caption = renderer.rules.footnote_caption?.(tokens, index, options, env, renderer)
  return `<sup class="footnote-ref"><span>${caption}</span></sup>`
}
markdown.renderer.rules.footnote_anchor = () => ' <span class="footnote-backref">\u21a9\uFE0E</span>'

type HtmlNode = DefaultTreeAdapterMap['node']
type HtmlElement = DefaultTreeAdapterMap['element']

function elementsIn(node: HtmlNode): HtmlElement[] {
  const elements: HtmlElement[] = []
  if ('tagName' in node) elements.push(node)
  if ('childNodes' in node) {
    for (const child of node.childNodes) elements.push(...elementsIn(child))
  }
  return elements
}

function textIn(node: HtmlNode): string {
  if (node.nodeName === '#text' && 'value' in node) return node.value
  if ('tagName' in node && node.tagName === 'br') return ' '
  if ('tagName' in node && node.tagName === 'img') {
    return node.attrs.find(attr => attr.name === 'alt')?.value ?? ''
  }
  return 'childNodes' in node ? node.childNodes.map(textIn).join('') : ''
}

export function renderPublicationMarkdown(content: string, cmsBaseUrl: string): PublicationMarkdown {
  // Keep Strapi's attribute and URL policy; players are outside the publication contract.
  const safeHtml = DOMPurify.sanitize(markdown.render(content.replaceAll('\\n', '\n')), {
    ALLOWED_ATTR: ['href', 'src', 'alt', 'align', 'center', 'width', 'height', 'type', 'controls', 'target', 'class', 'title'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|ftp|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['iframe', 'video', 'audio', 'source', 'track', 'object', 'embed'],
  })
  const fragment = parseFragment(safeHtml)
  const elements = elementsIn(fragment)
  // DOMPurify otherwise permits data: URLs on media even with ALLOWED_URI_REGEXP.
  for (const element of elements) {
    element.attrs = element.attrs.filter(attr => !(['src', 'href', 'xlink:href'].includes(attr.name)
      && /^data:/i.test(attr.value.replace(/\s/g, ''))))
    if (element.tagName === 'img') {
      const src = element.attrs.find(attr => attr.name === 'src')
      if (src) {
        try {
          src.value = new URL(src.value, cmsBaseUrl).href
        }
        catch {
          element.attrs = element.attrs.filter(attr => attr !== src)
        }
      }
    }
  }
  const headings = elements.filter(element => /^h[1-6]$/.test(element.tagName))
  const shift = headings.some(element => element.tagName === 'h1') ? 1 : 0
  const ids = new Set<string>()
  const toc: PublicationMarkdown['toc'] = []

  for (const heading of headings) {
    heading.tagName = `h${Math.min(Number(heading.tagName.slice(1)) + shift, 6)}`
    const label = textIn(heading).replace(/\s+/g, ' ').trim()
    const slug = label.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section'
    let id = slug
    let suffix = 2
    while (ids.has(id)) id = `${slug}-${suffix++}`
    ids.add(id)
    heading.attrs = heading.attrs.filter(attr => attr.name !== 'id')
    heading.attrs.push({ name: 'id', value: id })
    if (heading.tagName === 'h2') toc.push({ id, label })
  }

  return {
    html: serialize(fragment),
    toc,
  }
}

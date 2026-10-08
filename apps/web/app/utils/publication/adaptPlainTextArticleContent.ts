import type { ArticleBlock } from '~/types/publication'

export function adaptPlainTextArticleContent(content: string): readonly ArticleBlock[] {
  const paragraphs = content
    .split(/\r?\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)

  if (!paragraphs.length && content.trim()) {
    return [{ type: 'paragraph', text: content.trim() }]
  }

  return paragraphs.map(text => ({
    type: 'paragraph' as const,
    text,
  }))
}

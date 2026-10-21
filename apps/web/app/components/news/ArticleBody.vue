<script setup lang="ts">
import type { ArticleBlock } from '~/types/publication'
import type { PublicationMarkdown } from '~/utils/publication/renderPublicationMarkdown'

defineOptions({ name: 'ArticleBody' })

interface Props {
  blocks: readonly ArticleBlock[]
  markdown?: PublicationMarkdown
  missingMediaLabel?: string
}

withDefaults(defineProps<Props>(), {
  markdown: undefined,
  missingMediaLabel: 'Фотография будет добавлена',
})
</script>

<template>
  <!-- HTML is produced only by renderPublicationMarkdown, which sanitizes author content. -->
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="markdown"
    class="article-markdown min-w-0 text-body"
    v-html="markdown.html"
  />
  <!-- eslint-enable vue/no-v-html -->
  <div
    v-else
    class="min-w-0 text-body"
  >
    <template
      v-for="(block, index) in blocks"
      :key="block.type === 'heading' ? block.id : `${block.type}-${index}`"
    >
      <p
        v-if="block.type === 'paragraph'"
        class="mb-5"
      >
        {{ block.text }}
      </p>

      <h2
        v-else-if="block.type === 'heading'"
        :id="block.id"
        class="mt-10 scroll-mt-28 focus:outline-none first:mt-0"
      >
        {{ block.text }}
      </h2>

      <FigureMedia
        v-else-if="block.type === 'image'"
        :asset-id="block.media.assetId"
        :src="block.media.src"
        :alt="block.media.alt"
        :width="block.media.width || 1600"
        :height="block.media.height || 900"
        ratio="16/9"
        :focal-point="block.media.focalPoint"
        :caption="block.media.caption"
        :missing-label="missingMediaLabel"
        class="my-8"
      />

      <QuoteBlock
        v-else-if="block.type === 'quote'"
        :text="block.text"
        :citation="block.citation"
        class="my-8"
      />

      <ol
        v-else-if="block.type === 'list' && block.ordered"
        class="mb-6 grid gap-2 pl-6"
      >
        <li
          v-for="item in block.items"
          :key="item"
        >
          {{ item }}
        </li>
      </ol>

      <ul
        v-else-if="block.type === 'list'"
        class="mb-6 grid gap-2 pl-6"
      >
        <li
          v-for="item in block.items"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.article-markdown {
  overflow-wrap: anywhere;
}

.article-markdown :deep(:is(h2, h3, h4, h5, h6)) {
  margin-block: 2.5rem 1rem;
  scroll-margin-top: 7rem;
  color: var(--color-ink);
  font-weight: 700;
}

.article-markdown :deep(:is(h4, h5, h6)) {
  font-size: var(--text-body);
  line-height: var(--text-body--line-height);
}

.article-markdown :deep(h5) { font-style: italic; }
.article-markdown :deep(h6) { color: var(--color-muted); }
.article-markdown :deep(> :first-child) { margin-top: 0; }
.article-markdown :deep(> :last-child) { margin-bottom: 0; }

.article-markdown :deep(:is(p, ul, ol, dl, blockquote, pre, table)) {
  margin-block: 0 1.5rem;
}

.article-markdown :deep(:is(ul, ol)) {
  padding-inline-start: 1.75rem;
}

.article-markdown :deep(ul) { list-style-type: disc; }
.article-markdown :deep(ol) { list-style-type: decimal; }
.article-markdown :deep(ul ul) { list-style-type: circle; }
.article-markdown :deep(li + li) { margin-top: 0.5rem; }
.article-markdown :deep(li > :is(ul, ol)) { margin-block: 0.5rem 0; }
.article-markdown :deep(li > p) { margin-bottom: 0.5rem; }
.article-markdown :deep(dt) { font-weight: 700; }
.article-markdown :deep(dd) { margin: 0.5rem 0 1rem 1.5rem; }

.article-markdown :deep(blockquote) {
  border-inline-start: 4px solid var(--color-brand);
  padding: 1rem 1.25rem;
  background: var(--color-surface-accent);
}

.article-markdown :deep(blockquote > :last-child) { margin-bottom: 0; }
.article-markdown :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin-block: 1.5rem;
  border-radius: var(--radius-card);
}

.article-markdown :deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: var(--text-caption);
}

.article-markdown :deep(:is(th, td)) {
  border: 1px solid var(--color-border-control);
  padding: 0.75rem 1rem;
  text-align: start;
}

.article-markdown :deep(th) { background: var(--color-surface-accent); }
.article-markdown :deep([align="center"]) { text-align: center; }
.article-markdown :deep([align="right"]) { text-align: right; }
.article-markdown :deep(code) {
  border-radius: var(--radius-control);
  padding: 0.125rem 0.25rem;
  background: var(--color-surface-subtle);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.9em;
}

.article-markdown :deep(pre) {
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-card);
  padding: 1rem;
  background: var(--color-surface-subtle);
  overflow-wrap: normal;
  tab-size: 2;
}

.article-markdown :deep(pre code) { padding: 0; background: transparent; }
.article-markdown :deep(:is(.hljs-keyword, .hljs-selector-tag, .hljs-built_in, .hljs-type)) { color: var(--color-brand); }
.article-markdown :deep(:is(.hljs-string, .hljs-attr, .hljs-title)) { color: var(--color-success); }
.article-markdown :deep(:is(.hljs-number, .hljs-literal, .hljs-symbol)) { color: var(--color-error); }
.article-markdown :deep(:is(.hljs-comment, .hljs-quote)) { color: var(--color-muted); font-style: italic; }
.article-markdown :deep(.hljs-emphasis) { font-style: italic; }
.article-markdown :deep(.hljs-strong) { font-weight: 700; }
.article-markdown :deep(hr) { margin-block: 2rem; border-color: var(--color-border-subtle); }
.article-markdown :deep(mark) { background: #fff0b3; color: var(--color-ink); }
.article-markdown :deep(ins) { text-decoration: underline; }
.article-markdown :deep(abbr[title]) { text-decoration: underline dotted; cursor: help; }
.article-markdown :deep(:is(.warning, .tip)) {
  margin-block: 1.5rem;
  border-inline-start: 4px solid var(--color-brand);
  border-radius: var(--radius-control);
  padding: 1rem 1.25rem;
  background: var(--color-surface-accent);
}

.article-markdown :deep(.warning) { border-color: var(--color-focus); background: #fff8eb; }
.article-markdown :deep(:is(.warning, .tip) > :last-child) { margin-bottom: 0; }
.article-markdown :deep(.footnotes) { color: var(--color-muted); font-size: var(--text-caption); }
</style>

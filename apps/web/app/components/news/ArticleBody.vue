<script setup lang="ts">
import type { ArticleBlock } from '~/types/publication'

defineOptions({ name: 'ArticleBody' })

interface Props {
  blocks: readonly ArticleBlock[]
  missingMediaLabel?: string
}

withDefaults(defineProps<Props>(), {
  missingMediaLabel: 'Фотография будет добавлена',
})
</script>

<template>
  <div class="min-w-0 text-body">
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

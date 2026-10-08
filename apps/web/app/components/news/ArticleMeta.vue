<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '~/utils/formatDate'

defineOptions({ name: 'ArticleMeta' })

interface Props {
  publishedAt: string
  author?: string
}

const props = withDefaults(defineProps<Props>(), {
  author: undefined,
})

const readableDate = computed(() => formatDate(props.publishedAt))
</script>

<template>
  <dl class="m-0 flex flex-wrap gap-x-6 gap-y-2 text-caption text-muted">
    <div class="flex items-baseline gap-2">
      <dt class="sr-only">
        Дата публикации
      </dt>
      <dd class="m-0">
        <time :datetime="publishedAt">{{ readableDate }}</time>
      </dd>
    </div>

    <div
      v-if="author"
      class="flex items-baseline gap-2"
    >
      <dt class="sr-only">
        Автор
      </dt>
      <dd class="m-0">
        {{ author }}
      </dd>
    </div>
  </dl>
</template>

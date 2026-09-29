<script setup lang="ts">
import { computed } from 'vue'
import { createError, definePageMeta, useAsyncData, useRoute, useSeoMeta } from '#imports'
import { useNewsApi } from '~/api/newsApi'
import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'

defineOptions({ name: 'NewsArticlePage' })
definePageMeta({ key: route => route.fullPath })

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { getNewsBySlug } = useNewsApi()

const { data: article, error } = await useAsyncData(
  `news-${slug.value}`,
  () => getNewsBySlug(slug.value),
)

if (error.value) {
  const status = error.value.status === ERROR_STATUS.NOT_FOUND
    ? ERROR_STATUS.NOT_FOUND
    : ERROR_STATUS.BAD_GATEWAY

  throw createError({
    status,
    statusText: status === ERROR_STATUS.NOT_FOUND
      ? ERROR_MESSAGES.NEWS_NOT_FOUND
      : ERROR_MESSAGES.NEWS_LOAD_FAILED,
    cause: error.value,
  })
}

if (!article.value) {
  throw createError({
    status: ERROR_STATUS.NOT_FOUND,
    statusText: ERROR_MESSAGES.NEWS_NOT_FOUND,
  })
}

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.excerpt ?? undefined,
})
</script>

<template>
  <main>
    <nav aria-label="Хлебные крошки">
      <NuxtLink to="/news">
        Новости
      </NuxtLink>
    </nav>

    <article>
      <header>
        <h1>{{ article?.title }}</h1>
        <p v-if="article">
          <time :datetime="article.publishedAt">
            {{ new Date(article.publishedAt).toLocaleDateString('ru-RU', { timeZone: 'UTC' }) }}
          </time>
        </p>
        <p v-if="article?.excerpt">
          {{ article.excerpt }}
        </p>
      </header>

      <p class="news-content">
        {{ article?.content }}
      </p>
    </article>
  </main>
</template>

<style scoped>
.news-content {
  white-space: pre-wrap;
}
</style>

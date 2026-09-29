<script setup lang="ts">
import { useAsyncData, useSeoMeta } from '#imports'
import { useNewsApi } from '~/api/newsApi'
import { ERROR_MESSAGES } from '~/constants/errorConstants'

defineOptions({ name: 'NewsIndexPage' })

const { getPublishedNews } = useNewsApi()
const { data: news, error, refresh, status } = await useAsyncData(
  'published-news',
  () => getPublishedNews(),
)

useSeoMeta({
  title: 'Новости',
  description: 'Опубликованные новости',
})
</script>

<template>
  <main>
    <header>
      <h1>Новости</h1>
    </header>

    <section
      v-if="error"
      aria-labelledby="news-error-title"
    >
      <h2 id="news-error-title">
        {{ ERROR_MESSAGES.NEWS_LIST_LOAD_FAILED }}
      </h2>
      <p>{{ error.message }}</p>
      <button
        type="button"
        :disabled="status === 'pending'"
        @click="refresh()"
      >
        Попробовать снова
      </button>
    </section>

    <p v-else-if="!news?.length">
      Опубликованных новостей пока нет.
    </p>

    <ul v-else>
      <li
        v-for="article in news"
        :key="article.documentId"
      >
        <article>
          <h2>
            <NuxtLink :to="`/news/${article.slug}`">
              {{ article.title }}
            </NuxtLink>
          </h2>
          <p v-if="article.excerpt">
            {{ article.excerpt }}
          </p>
          <time :datetime="article.publishedAt">
            {{ new Date(article.publishedAt).toLocaleDateString('ru-RU', { timeZone: 'UTC' }) }}
          </time>
        </article>
      </li>
    </ul>
  </main>
</template>

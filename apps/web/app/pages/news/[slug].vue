<script setup lang="ts">
import { definePageMeta } from '#imports'
import { usePublicationDetailPage } from '~/composables/publication/usePublicationDetailPage'

defineOptions({ name: 'NewsArticlePage' })
definePageMeta({ key: route => route.path })

const {
  archiveTo,
  article,
  articleBlocks,
  breadcrumbTitle,
  isPreviewMode,
  relatedArticles,
  tocItems,
} = await usePublicationDetailPage()
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Новости', to: archiveTo },
          { label: breadcrumbTitle },
        ]"
        class="mb-8"
      />

      <article v-if="article">
        <header class="mx-auto max-w-[62rem]">
          <h1>{{ article.title }}</h1>
          <ArticleMeta
            :published-at="article.publishedAt"
            :author="article.author"
            class="mb-5"
          />
          <p
            v-if="article.lead || article.excerpt"
            class="mb-8 max-w-[52rem] text-intro"
          >
            {{ article.lead || article.excerpt }}
          </p>

          <FigureMedia
            v-if="article.media"
            :asset-id="article.media.assetId"
            :src="article.media.src"
            :alt="article.media.alt"
            :width="article.media.width || 1600"
            :height="article.media.height || 900"
            ratio="16/9"
            :focal-point="article.media.focalPoint"
            :caption="article.media.caption"
            loading="eager"
            :missing-label="isPreviewMode ? 'Демонстрационный материал' : 'Фотография будет добавлена'"
          />
        </header>

        <div class="mx-auto mt-10 flex max-w-[62rem] min-w-0 flex-col gap-8 desktop:flex-row desktop:items-start desktop:gap-10">
          <ArticleToc
            v-if="tocItems.length"
            :items="tocItems"
          />
          <ArticleBody
            :blocks="articleBlocks"
            :missing-media-label="isPreviewMode ? 'Демонстрационный материал' : 'Фотография будет добавлена'"
            :class="tocItems.length ? 'w-full flex-1' : 'w-full desktop:ml-auto'"
          />
        </div>
      </article>

      <section
        v-if="relatedArticles.length"
        class="mx-auto mt-section-mobile max-w-[62rem] border-t border-border-subtle pt-section-block-mobile tablet:mt-section-tablet tablet:pt-section-block"
        aria-labelledby="related-publications-heading"
      >
        <h2 id="related-publications-heading">
          Читайте также
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-2 tablet:gap-6">
          <li
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.documentId"
            class="min-w-0"
          >
            <NewsCard
              :title="relatedArticle.title"
              :slug="relatedArticle.slug"
              :excerpt="relatedArticle.excerpt || ''"
              :published-at="relatedArticle.publishedAt"
              :media="relatedArticle.media || {
                assetId: `publication-${relatedArticle.documentId}`,
                alt: `Иллюстрация к публикации «${relatedArticle.title}»`,
              }"
              :missing-label="isPreviewMode ? 'Демонстрационный материал' : 'Фотография будет добавлена'"
            />
          </li>
        </ul>
      </section>

      <div class="mx-auto mt-8 max-w-[62rem]">
        <ActionLink
          :to="archiveTo"
          variant="secondary"
        >
          Все новости
        </ActionLink>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import {
  previewProjectReviewFaqItems,
} from '~/constants/mocks/odiAndProjectReview'

defineOptions({ name: 'ProjectReviewServicePage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'Согласование проектов',
  description: 'Экспертное обсуждение проектных решений с точки зрения доступности.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/services/project-review', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Услуги', to: '/services' },
          { label: 'Согласование проектов' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Согласование проектов"
        lead="Экспертный диалог и проверка проектных решений с точки зрения доступности."
        :actions="[
          { label: 'Обсудить проект', to: '/contacts' },
        ]"
        :media="{
          assetId: 'approval-meeting',
          alt: 'Команда обсуждает проектные решения',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="project-review-use-heading"
      >
        <h2 id="project-review-use-heading">
          Когда полезна консультация
        </h2>
        <FeatureList
          :items="[
            {
              title: 'На этапе подготовки проекта',
              body: 'Помогаем заранее обсудить доступность решений.',
              icon: 'document',
            },
            {
              title: 'Перед согласованием',
              body: 'Рассматриваем материалы и готовим вопросы для уточнения.',
              icon: 'people',
            },
          ]"
          :columns="2"
        />
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="project-review-result-heading"
      >
        <h2 id="project-review-result-heading">
          Результат
        </h2>
        <div class="grid items-center gap-6 tablet:grid-cols-2 tablet:gap-8">
          <FigureMedia
            asset-id="local-papers"
            alt="Комплект материалов с рекомендациями"
            :width="720"
            :height="480"
            ratio="3/2"
          />
          <div class="text-muted">
            <p class="mt-0">
              Вы получаете рекомендации по рассмотренным решениям и перечень вопросов, которые требуют дополнительного обсуждения.
            </p>
            <p class="mb-0">
              Формат и объём зависят от конкретного объекта и согласованной задачи.
            </p>
          </div>
        </div>
      </section>

      <InlineNotice
        class="mt-6"
        text="Формат работы и состав материалов определяются после знакомства с задачей."
      />

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="project-review-faq-heading"
      >
        <h2 id="project-review-faq-heading">
          Частые вопросы
        </h2>
        <FaqAccordion :items="previewProjectReviewFaqItems" />
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="project-review-related-heading"
      >
        <h2 id="project-review-related-heading">
          Связанные услуги
        </h2>
        <RelatedServiceList
          :service-ids="[
            'odi',
            'local-documents',
            'accessibility-passport',
          ]"
        />
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Обсудим ваш проект"
      text="Расскажите о задаче — ответим на вопросы и уточним подходящий формат работы."
      cta-label="Обсудить проект"
      cta-to="/contacts"
    />
  </div>
</template>

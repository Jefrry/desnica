<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import {
  previewLocalDocumentFaqItems,
  previewLocalDocumentFeatures,
} from '~/constants/mocks/localDocuments'
import { previewServices } from '~/constants/mocks/services'

defineOptions({ name: 'LocalDocumentsServicePage' })

const requestUrl = useRequestURL()
const relatedServices = previewServices.filter(service => (
  service.id === 'odi' || service.id === 'project-review'
))

useSeoMeta({
  title: 'Разработка локальных документов',
  description: 'Подготовка локальных документов для инклюзивного оказания услуг.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/services/local-documents', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Услуги', to: '/services' },
          { label: 'Локальные документы' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Разработка локальных документов"
        lead="Помогаем организовать инклюзивное оказание услуг с учётом потребностей людей с инвалидностью. Подготовим понятные документы для работы команды."
        :actions="[
          { label: 'Обсудить задачу', to: '/contacts' },
        ]"
        :media="{
          assetId: 'planning-session',
          alt: 'Специалисты обсуждают структуру документов',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="local-documents-audience-heading"
      >
        <h2 id="local-documents-audience-heading">
          Кому подойдёт
        </h2>
        <div class="flex max-w-[56rem] items-start gap-4 rounded-card bg-surface-accent p-5 tablet:p-6">
          <DecorativeIcon
            name="people"
            class="mt-0.5 size-8 shrink-0 text-brand"
          />
          <p class="m-0">
            Государственным и муниципальным учреждениям, НКО, образовательным, культурным и социальным организациям, которые хотят сделать услуги доступнее и выстроить понятные внутренние процессы.
          </p>
        </div>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="local-documents-included-heading"
      >
        <h2 id="local-documents-included-heading">
          Что входит в работу
        </h2>
        <FeatureList
          :items="previewLocalDocumentFeatures"
          :columns="2"
        />
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="local-documents-result-heading"
      >
        <h2 id="local-documents-result-heading">
          Что вы получите
        </h2>
        <div class="grid gap-4 tablet:grid-cols-2">
          <div class="flex min-w-0 items-start gap-4 rounded-card border border-border-subtle bg-surface p-5">
            <DecorativeIcon
              name="document"
              class="mt-0.5 size-8 shrink-0 text-brand"
            />
            <p class="m-0 text-muted">
              Комплект материалов, адаптированный под согласованную задачу, и рекомендации по внедрению.
            </p>
          </div>
          <div class="flex min-w-0 items-start gap-4 rounded-card border border-border-subtle bg-surface p-5">
            <DecorativeIcon
              name="check"
              class="mt-0.5 size-8 shrink-0 text-brand"
            />
            <p class="m-0 text-muted">
              Состав комплекта определяется после знакомства с процессами организации; универсальный документ не подменяет анализ конкретной ситуации.
            </p>
          </div>
        </div>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="local-documents-faq-heading"
      >
        <h2 id="local-documents-faq-heading">
          Частые вопросы
        </h2>
        <FaqAccordion
          :items="previewLocalDocumentFaqItems"
          initial-open-id="organization-specifics"
        />
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="local-documents-related-heading"
      >
        <h2 id="local-documents-related-heading">
          Другие услуги
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-2">
          <li
            v-for="service in relatedServices"
            :key="service.id"
          >
            <RelatedLinkCard
              :to="service.to"
              :title="service.title"
              :description="service.description"
              :media="{ assetId: service.assetId }"
            />
          </li>
        </ul>
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Остались вопросы?"
      text="Расскажите о своей ситуации — подскажем, как можем помочь."
      cta-label="Обсудить задачу"
      cta-to="/contacts"
    />
  </div>
</template>

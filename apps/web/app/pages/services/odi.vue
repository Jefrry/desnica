<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import { previewOdiFeatures } from '~/constants/mocks/odiAndProjectReview'

defineOptions({ name: 'OdiServicePage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'Проектирование 10 раздела ОДИ',
  description: 'Проектные решения по обеспечению доступности зданий и помещений для людей с инвалидностью.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/services/odi', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Услуги', to: '/services' },
          { label: 'Проектирование 10 раздела ОДИ' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Проектирование 10 раздела ОДИ"
        lead="Решения по обеспечению доступа людей с инвалидностью."
        :actions="[
          { label: 'Обсудить проект', to: '/contacts' },
        ]"
        :media="{
          assetId: 'accessible-entrance',
          alt: 'Вход в здание с пандусом и поручнями',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        class="mt-12 rounded-card bg-surface-accent p-5 tablet:mt-16 tablet:p-8"
        aria-labelledby="odi-purpose-heading"
      >
        <h2 id="odi-purpose-heading">
          Задачи раздела
        </h2>
        <div class="grid max-w-[64rem] gap-4 text-muted tablet:grid-cols-2 tablet:gap-8">
          <p class="m-0">
            Проектирование начинается с понимания того, как люди будут пользоваться объектом. Важно рассмотреть путь посетителя, вход, перемещение внутри и получение услуг.
          </p>
          <p class="m-0">
            Согласованные решения описываются в материалах проекта. Состав работ зависит от объекта и исходных данных; конкретные требования и ограничения уточняются до начала подготовки.
          </p>
        </div>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="odi-included-heading"
      >
        <h2 id="odi-included-heading">
          Что входит
        </h2>
        <FeatureList
          :items="previewOdiFeatures"
          :columns="2"
        />
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="odi-materials-heading"
      >
        <h2 id="odi-materials-heading">
          Что нужно для начала
        </h2>
        <div class="grid items-center gap-6 tablet:grid-cols-2 tablet:gap-8">
          <FigureMedia
            asset-id="tactile-plan"
            alt="План помещения и образец тактильного указателя"
            :width="720"
            :height="480"
            ratio="3/2"
          />
          <ul class="m-0 grid list-none gap-4 p-0">
            <li class="flex items-start gap-3">
              <DecorativeIcon
                name="check"
                class="mt-0.5 size-6 shrink-0 text-brand"
              />
              <span>Планы объекта в имеющемся формате</span>
            </li>
            <li class="flex items-start gap-3">
              <DecorativeIcon
                name="check"
                class="mt-0.5 size-6 shrink-0 text-brand"
              />
              <span>Описание задачи и особенностей объекта</span>
            </li>
            <li class="flex items-start gap-3">
              <DecorativeIcon
                name="check"
                class="mt-0.5 size-6 shrink-0 text-brand"
              />
              <span>Исходные материалы при наличии</span>
            </li>
          </ul>
        </div>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="odi-related-heading"
      >
        <h2 id="odi-related-heading">
          Связанные услуги
        </h2>
        <RelatedServiceList
          :service-ids="[
            'project-review',
            'accessibility-passport',
            'local-documents',
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

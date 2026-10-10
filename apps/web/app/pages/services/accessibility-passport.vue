<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import {
  previewAccessibilityPassportFaqItems,
  previewAccessibilityPassportPreparation,
} from '~/constants/mocks/passportAndTraining'

defineOptions({ name: 'AccessibilityPassportServicePage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'Паспорт доступности',
  description: 'Обследование объекта и подготовка материалов о его доступности.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/services/accessibility-passport', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Услуги', to: '/services' },
          { label: 'Паспорт доступности' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Паспорт доступности"
        lead="Помогаем разобраться, насколько объект удобен для посетителей."
        :actions="[
          { label: 'Обсудить обследование', to: '/contacts' },
        ]"
        :media="{
          assetId: 'entrance-assessment',
          alt: 'Специалисты обследуют вход в здание',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="passport-purpose-heading"
      >
        <h2 id="passport-purpose-heading">
          Для чего нужен паспорт
        </h2>
        <div class="grid max-w-[68rem] gap-4 text-muted tablet:grid-cols-2 tablet:gap-8">
          <p class="m-0">
            Обследование помогает увидеть барьеры, определить приоритеты и обсудить дальнейшие действия. Мы рассматриваем не только здание, но и то, как посетитель получает услугу.
          </p>
          <p class="m-0">
            Материалы обследования позволяют команде системно работать с вопросами доступности. Состав материалов и формат взаимодействия определяются с учётом объекта и задачи.
          </p>
        </div>
      </section>

      <div class="mt-12 grid gap-10 tablet:mt-16 tablet:grid-cols-2 tablet:gap-8">
        <section aria-labelledby="passport-preparation-heading">
          <h2 id="passport-preparation-heading">
            Что подготовить
          </h2>
          <ul class="m-0 grid list-none gap-4 p-0">
            <li
              v-for="item in previewAccessibilityPassportPreparation"
              :key="item"
              class="flex items-start gap-3"
            >
              <DecorativeIcon
                name="check"
                class="mt-0.5 size-6 shrink-0 text-brand"
              />
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="passport-result-heading">
          <h2 id="passport-result-heading">
            Что вы получите
          </h2>
          <p class="text-muted">
            Описание наблюдений, перечень выявленных барьеров и рекомендации в согласованном формате. Фото и схемы включаются при наличии и необходимости.
          </p>
          <FigureMedia
            asset-id="passport-document"
            alt="Пример комплекта материалов обследования"
            :width="720"
            :height="405"
            ratio="16/9"
            caption="Иллюстрация комплекта материалов, не файл для скачивания."
            missing-label="Иллюстрация материалов"
          />
        </section>
      </div>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="passport-faq-heading"
      >
        <h2 id="passport-faq-heading">
          Частые вопросы
        </h2>
        <FaqAccordion
          :items="previewAccessibilityPassportFaqItems"
          initial-open-id="assessment-duration"
        />
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Остались вопросы или хотите обсудить обследование?"
      text="Расскажем подробнее о формате работы и поможем подобрать подходящий вариант."
      cta-label="Обсудить обследование"
      cta-to="/contacts"
    />
  </div>
</template>

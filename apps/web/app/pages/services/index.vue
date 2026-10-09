<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import { previewServices } from '~/constants/mocks/services'

defineOptions({ name: 'ServicesIndexPage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'Услуги',
  description: 'Услуги Ресурсного центра по созданию доступной среды.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/services', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Услуги' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Помогаем создавать доступную среду"
        lead="Консультируем, разрабатываем документы, сопровождаем проекты. Помогаем организациям делать услуги, пространство и информацию доступными для всех."
        :actions="[
          { label: 'Получить консультацию', to: '/contacts' },
          { label: 'Узнать больше об услугах', to: '#services-list', variant: 'secondary' },
        ]"
        :media="{
          assetId: 'planning-session',
          alt: 'Специалисты рассматривают планы и документы',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        id="services-list"
        class="mt-12 scroll-mt-28 tablet:mt-16"
        aria-labelledby="services-list-heading"
      >
        <h2 id="services-list-heading">
          Наши услуги
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-2 tablet:gap-6">
          <li
            v-for="service in previewServices"
            :key="service.id"
            class="min-w-0"
          >
            <ServiceCard
              :asset-id="service.assetId"
              :alt="service.alt"
              :title="service.title"
              :description="service.description"
              :to="service.to"
            />
          </li>
        </ul>
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Не знаете, с чего начать?"
      text="Расскажите о своей задаче — подскажем, какой формат поддержки подойдёт вам."
      cta-label="Получить консультацию"
      cta-to="/contacts"
    />
  </div>
</template>

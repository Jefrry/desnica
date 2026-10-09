<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import { previewMissionPrinciples } from '~/constants/mocks/mission'

defineOptions({ name: 'AboutMissionPage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'Наша миссия',
  description: 'Миссия и принципы Ресурсного центра.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/about/mission', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'О нас', to: '/about' },
          { label: 'Наша миссия' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Наша миссия"
        lead="Помогать людям и организациям создавать среду, в которой доступность становится естественной частью повседневной жизни."
        :media="{
          assetId: 'mission-together',
          alt: 'Люди вместе обсуждают доступность пространства',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      >
        <template #body>
          <p class="mb-0">
            Мы соединяем опыт людей, профессиональные знания и готовность команд меняться, чтобы полезные решения становились устойчивой практикой.
          </p>
        </template>
      </PageIntro>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="mission-principles-heading"
      >
        <h2 id="mission-principles-heading">
          Наши принципы
        </h2>
        <PrincipleList :items="previewMissionPrinciples" />
      </section>

      <QuoteBlock
        class="mt-12 tablet:mt-16"
        text="Доступность начинается с внимания к человеку и становится реальностью, когда мы действуем вместе."
      />
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Начнём с вашей задачи"
      text="Свяжитесь с нами, чтобы обсудить ситуацию и определить следующий шаг."
      cta-label="Обсудить сотрудничество"
      cta-to="/contacts"
    />
  </div>
</template>

<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import { TEAM_MEMBERS } from '~/constants/team'

defineOptions({ name: 'AboutIndexPage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'О нас',
  description: 'О Ресурсном центре, направлениях работы, команде и подходе к сотрудничеству.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/about', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'О нас' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="О нас"
        lead="Мы помогаем людям и организациям находить практические решения для доступной и открытой среды."
        :media="{
          assetId: 'team-meeting',
          alt: 'Команда Ресурсного центра обсуждает совместную работу',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      >
        <template #body>
          <p>
            Ресурсный центр объединяет знания об инклюзии и доступности с опытом тех, кто ежедневно сталкивается с барьерами. Мы внимательно изучаем задачу и предлагаем понятный путь к изменениям.
          </p>
          <p class="mb-0">
            Работа строится на диалоге: вместе определяем приоритеты, подбираем подходящий формат поддержки и помогаем применять решения на практике.
          </p>
        </template>
      </PageIntro>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="about-directions-heading"
      >
        <h2 id="about-directions-heading">
          Чем мы занимаемся
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-3 tablet:gap-6">
          <li>
            <AboutLinkCard
              to="/services"
              title="Помогаем создавать доступную среду"
              description="Консультируем по документам, проектам и оценке доступности."
            />
          </li>
          <li>
            <AboutLinkCard
              to="/training"
              title="Делимся знаниями"
              description="Проводим обучение для команд и помогаем применять принципы инклюзии."
            />
          </li>
          <li>
            <AboutLinkCard
              to="/ngo"
              title="Поддерживаем НКО"
              description="Помогаем организациям развивать практики и обмениваться опытом."
            />
          </li>
        </ul>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="about-team-heading"
      >
        <h2 id="about-team-heading">
          Наша команда
        </h2>
        <p class="max-w-[46rem] text-muted">
          Над задачами работают специалисты с разными компетенциями. Вместе они помогают увидеть ситуацию с разных сторон и перейти от обсуждения к практическим решениям.
        </p>
        <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-3 tablet:gap-6">
          <li
            v-for="member in TEAM_MEMBERS"
            :key="member.assetId"
            class="min-w-0"
          >
            <PersonCard
              :asset-id="member.assetId"
              :alt="member.alt"
              :role="member.role"
            />
          </li>
        </ul>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="about-related-heading"
      >
        <h2 id="about-related-heading">
          Узнайте больше
        </h2>
        <ul class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-3 tablet:gap-6">
          <li>
            <AboutLinkCard
              to="/about/mission"
              title="Наша миссия"
              description="Принципы, которые определяют нашу работу."
            />
          </li>
          <li>
            <AboutLinkCard
              to="/about/documents"
              title="Уставные документы"
              description="Документы Ресурсного центра и их текстовые версии."
            />
          </li>
          <li>
            <AboutLinkCard
              to="/about/reports"
              title="Годовая отчётность"
              description="Материалы о работе центра по годам."
            />
          </li>
        </ul>
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Давайте работать вместе"
      text="Расскажите о своей задаче — обсудим, какой формат поддержки подойдёт лучше всего."
      cta-label="Связаться с нами"
      cta-to="/contacts"
    />
  </div>
</template>

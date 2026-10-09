<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useSeoMeta } from '#imports'
import { usePublicationSource } from '~/composables/publication/usePublicationSource'
import { TEAM_MEMBERS } from '~/constants/team'

defineOptions({ name: 'HomePage' })

const publicationSource = usePublicationSource()
const { data: publicationPage, error, refresh, status } = await useAsyncData(
  'home-latest-publications',
  () => publicationSource.list({ page: 1, pageSize: 3 }),
)

const publications = computed(() => publicationPage.value?.items.slice(0, 3) ?? [])
const publicationState = computed<'pending' | 'empty' | 'error' | 'success'>(() => {
  if (status.value === 'pending' && !publicationPage.value) return 'pending'
  if (error.value) return 'error'
  if (!publications.value.length) return 'empty'
  return 'success'
})

useSeoMeta({
  title: 'Главная',
  description: 'Ресурсный центр помогает людям с инвалидностью, поддерживает организации и создаёт доступную среду.',
})
</script>

<template>
  <div>
    <Container class="py-section-mobile tablet:py-section-tablet desktop:py-section-desktop">
      <HomeHero
        heading-id="home-title"
        title="Возможности начинаются с доступности"
        lead="Помогаем людям с инвалидностью, поддерживаем организации и создаём среду, удобную для каждого."
        :actions="[
          { label: 'Наши услуги', to: '/services' },
          { label: 'О Ресурсном центре', to: '/about', variant: 'secondary' },
        ]"
      />
    </Container>

    <Section
      id="about-centre"
      title="Ресурсный центр — рядом с вами"
      heading-level="h2"
      tone="accent"
    >
      <div class="grid min-w-0 gap-6 tablet:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] tablet:gap-x-10">
        <p class="m-0 max-w-[38rem]">
          Мы развиваем возможности людей с инвалидностью, поддерживаем некоммерческие организации и помогаем создавать инклюзивную среду в обществе. Верим, что доступность открывает путь к полноценной жизни, образованию, работе и самореализации.
        </p>

        <FigureMedia
          asset-id="team-meeting"
          alt="Команда Ресурсного центра обсуждает совместную работу"
          :width="1600"
          :height="900"
          ratio="16/9"
          missing-label="Фотография команды будет добавлена"
          class="tablet:col-start-2 tablet:row-span-2 tablet:row-start-1"
        />

        <nav
          aria-label="Подробнее о Ресурсном центре"
          class="flex flex-wrap items-start gap-x-6 gap-y-2 tablet:col-start-1"
        >
          <ActionLink
            to="/about/mission"
            variant="text"
          >
            Наша миссия
            <span aria-hidden="true">→</span>
          </ActionLink>
          <ActionLink
            to="/about/documents"
            variant="text"
          >
            Документы
            <span aria-hidden="true">→</span>
          </ActionLink>
          <ActionLink
            to="/about/reports"
            variant="text"
          >
            Отчётность
            <span aria-hidden="true">→</span>
          </ActionLink>
        </nav>
      </div>
    </Section>

    <Section
      id="team"
      title="Люди, которые помогают"
      heading-level="h2"
    >
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
    </Section>

    <Section
      id="latest-publications"
      title="Последние новости"
      heading-level="h2"
    >
      <div class="mb-6 flex justify-end">
        <ActionLink
          to="/news"
          variant="text"
        >
          Все новости
          <span aria-hidden="true">→</span>
        </ActionLink>
      </div>

      <PublicationCollectionState
        v-if="publicationState !== 'success'"
        :state="publicationState"
        :retrying="status === 'pending'"
        @retry="refresh()"
      />

      <ul
        v-else
        class="m-0 grid list-none gap-4 p-0 tablet:grid-cols-3 tablet:gap-6"
      >
        <li
          v-for="publication in publications"
          :key="publication.documentId"
          class="min-w-0"
        >
          <NewsCard
            :title="publication.title"
            :slug="publication.slug"
            :excerpt="publication.excerpt || ''"
            :published-at="publication.publishedAt"
            :media="publication.media || {
              assetId: `publication-${publication.documentId}`,
              alt: `Иллюстрация к публикации «${publication.title}»`,
            }"
          />
        </li>
      </ul>
    </Section>

    <ContactBand
      id="home-contact"
      title="Давайте обсудим вашу задачу"
      text="Ответим на вопросы, подскажем решения и поможем найти подходящий формат поддержки."
      cta-label="Связаться с нами"
      cta-to="/contacts"
      :phone="{ value: 'уточняется' }"
      :email="{ value: 'уточняется' }"
    />
  </div>
</template>

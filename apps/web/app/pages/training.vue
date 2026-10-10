<script setup lang="ts">
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import {
  previewTrainingFormats,
  previewTrainingPrograms,
} from '~/constants/mocks/passportAndTraining'

defineOptions({ name: 'TrainingPage' })

const requestUrl = useRequestURL()

useSeoMeta({
  title: 'Обучение',
  description: 'Программы о доступной среде, общении без барьеров и инклюзивном сервисе.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/training', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Обучение' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Обучение"
        lead="Знания, которые помогают создавать равные возможности."
        :media="{
          assetId: 'training-workshop',
          alt: 'Ведущий проводит занятие для группы',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="training-programs-heading"
      >
        <h2 id="training-programs-heading">
          Программы обучения
        </h2>
        <div class="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          <ProgramCard
            v-for="program in previewTrainingPrograms"
            :key="program.id"
            :asset-id="program.assetId"
            :alt="program.alt"
            :audience="program.audience"
            :title="program.title"
            :description="program.description"
          />
        </div>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="training-formats-heading"
      >
        <h2 id="training-formats-heading">
          Форматы обучения
        </h2>
        <div class="grid gap-6 tablet:grid-cols-2">
          <article
            v-for="format in previewTrainingFormats"
            :key="format.title"
            class="grid min-w-0 overflow-hidden rounded-card border border-border-subtle bg-surface tablet:grid-cols-[minmax(8rem,0.8fr)_minmax(0,1.2fr)]"
          >
            <FigureMedia
              :asset-id="format.assetId"
              :alt="format.alt"
              :width="640"
              :height="360"
              ratio="var(--training-format-ratio)"
              class="[--training-format-ratio:16/9] tablet:[--training-format-ratio:1] [&>div]:rounded-none [&>div]:border-0"
            />
            <div class="p-5">
              <DecorativeIcon
                :name="format.icon"
                class="mb-3 size-8 text-brand"
              />
              <h3>{{ format.title }}</h3>
              <p class="mb-0 text-caption text-muted">
                {{ format.description }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Подберём программу для вашей команды"
      text="Обсудим ваши задачи, подскажем подходящий формат и ответим на вопросы."
      cta-label="Обсудить обучение"
      cta-to="/contacts"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta } from '#imports'
import {
  productionLegalText,
} from '~/constants/legal'
import { previewLegalText } from '~/constants/mocks/legal'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { selectDeploymentContent } from '~/utils/preview/selectDeploymentContent'

defineOptions({ name: 'LegalPage' })

const isPreviewMode = useDeploymentPreview()
const legalText = computed(() => selectDeploymentContent({
  previewMode: isPreviewMode.value,
  production: productionLegalText,
  preview: previewLegalText,
}))

useSeoMeta({
  title: 'Правовая информация',
  description: 'Правовая информация Ресурсного центра.',
})
</script>

<template>
  <Container>
    <Breadcrumbs
      :items="[
        { label: 'Главная', to: '/' },
        { label: 'Правовая информация' },
      ]"
      class="mb-8"
    />

    <article>
      <h1>Правовая информация</h1>

      <template v-if="legalText.availability === 'available'">
        <section
          v-for="section in legalText.data.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-28"
          :aria-labelledby="`${section.id}-title`"
        >
          <h2 :id="`${section.id}-title`">
            {{ section.title }}
          </h2>
          <p
            v-for="paragraph in section.paragraphs"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
        </section>
      </template>

      <section
        v-else
        id="personal-data"
        class="scroll-mt-28"
        aria-labelledby="personal-data-title"
      >
        <h2 id="personal-data-title">
          Обработка персональных данных
        </h2>
        <p>{{ legalText.message }}</p>
      </section>
    </article>
  </Container>
</template>

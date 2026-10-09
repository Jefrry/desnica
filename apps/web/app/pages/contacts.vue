<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta } from '#imports'
import { productionContactContent } from '~/constants/contact'
import { previewContactContent } from '~/constants/mocks/contact'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { selectDeploymentContent } from '~/utils/preview/selectDeploymentContent'

defineOptions({ name: 'ContactsPage' })

const isPreviewMode = useDeploymentPreview()
const contactContent = computed(() => selectDeploymentContent({
  previewMode: isPreviewMode.value,
  production: productionContactContent,
  preview: previewContactContent,
}))

useSeoMeta({
  title: 'Контакты',
  description: 'Контакты Ресурсного центра.',
})
</script>

<template>
  <Container>
    <Breadcrumbs
      :items="[
        { label: 'Главная', to: '/' },
        { label: 'Контакты' },
      ]"
      class="mb-8"
    />

    <header class="mb-8 tablet:mb-10">
      <h1>Контакты</h1>
      <p class="text-intro mb-0">
        Выберите удобный способ связи.
      </p>
    </header>

    <ContactDetails
      :content="contactContent"
    />
  </Container>
</template>

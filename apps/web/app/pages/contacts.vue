<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { previewContactContent } from '~/constants/mocks/contact'

defineOptions({ name: 'ContactsPage' })

const contactContent = previewContactContent

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

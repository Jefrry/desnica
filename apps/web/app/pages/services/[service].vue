<script setup lang="ts">
import { computed } from 'vue'
import { createError, useHead, useRequestURL, useRoute, useSeoMeta } from '#imports'
import { previewServices } from '~/constants/mocks/services'

defineOptions({ name: 'ServiceOverviewPage' })

const route = useRoute()
const requestUrl = useRequestURL()
const serviceId = computed(() => String(route.params.service))
const service = computed(() => {
  const selectedService = previewServices.find(item => item.id === serviceId.value)

  if (!selectedService || selectedService.id === 'local-documents') {
    throw createError({ statusCode: 404, statusMessage: 'Услуга не найдена' })
  }

  return selectedService
})

useSeoMeta({
  title: () => service.value.title,
  description: () => service.value.description,
})

useHead({
  link: [{ rel: 'canonical', href: new URL(service.value.to, requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Услуги', to: '/services' },
          { label: service.title },
        ]"
        class="mb-8"
      />

      <PageIntro
        :title="service.title"
        :lead="service.lead"
        :actions="[
          { label: 'Обсудить задачу', to: '/contacts' },
        ]"
        :media="{
          assetId: service.assetId,
          alt: service.alt,
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Обсудим вашу задачу"
      text="Расскажите о своей ситуации — уточним подходящий формат работы."
      cta-label="Связаться с нами"
      cta-to="/contacts"
    />
  </div>
</template>

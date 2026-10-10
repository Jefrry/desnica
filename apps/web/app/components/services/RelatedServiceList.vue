<script setup lang="ts">
import { computed } from 'vue'
import { previewServices } from '~/constants/mocks/services'
import type { ServiceDefinition } from '~/types/service/service'

defineOptions({ name: 'RelatedServiceList' })

interface Props {
  serviceIds: ServiceDefinition['id'][]
}

const props = defineProps<Props>()
const services = computed(() => props.serviceIds.flatMap(serviceId => (
  previewServices.filter(service => service.id === serviceId)
)))
</script>

<template>
  <ul
    class="m-0 grid list-none gap-4 p-0"
    :class="services.length === 2 ? 'tablet:grid-cols-2' : 'tablet:grid-cols-3'"
  >
    <li
      v-for="service in services"
      :key="service.id"
      class="min-w-0"
    >
      <RelatedLinkCard
        :to="service.to"
        :title="service.title"
        :description="service.description"
        :media="{ assetId: service.assetId }"
      />
    </li>
  </ul>
</template>

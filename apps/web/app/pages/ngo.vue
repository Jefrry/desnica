<script setup lang="ts">
import { computed } from 'vue'
import { useHead, useRequestURL, useSeoMeta } from '#imports'
import {
  previewNgoMaterials,
  productionNgoMaterials,
  ngoSupportAreas,
} from '~/constants/ngo'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { selectDeploymentContent } from '~/utils/preview/selectDeploymentContent'

defineOptions({ name: 'NgoPage' })

const requestUrl = useRequestURL()
const isPreviewMode = useDeploymentPreview()
const ngoMaterials = computed(() => selectDeploymentContent({
  previewMode: isPreviewMode.value,
  production: productionNgoMaterials,
  preview: previewNgoMaterials,
}))

useSeoMeta({
  title: 'Работа НКО',
  description: 'Поддержка некоммерческих организаций, обмен опытом и совместные инициативы.',
})

useHead({
  link: [{ rel: 'canonical', href: new URL('/ngo', requestUrl.origin).toString() }],
})
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'Работа НКО' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Работа НКО"
        lead="Объединяем усилия для устойчивых социальных изменений."
        :media="{
          assetId: 'team-meeting',
          alt: 'Коллеги обсуждают материалы за общим столом',
          width: 720,
          height: 480,
          loading: 'eager',
        }"
      />

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="ngo-support-heading"
      >
        <div class="max-w-[54rem]">
          <h2 id="ngo-support-heading">
            Поддержка организаций
          </h2>
          <p>
            Мы помогаем некоммерческим организациям, работающим с людьми с инвалидностью, развивать инициативы, выстраивать партнёрства и находить возможности для совместной работы.
          </p>
          <p class="mb-0 text-muted">
            Ресурсный центр предоставляет консультационную и методическую поддержку, организует обмен опытом и обсуждение идей. Формат сотрудничества определяется вместе с участниками, исходя из их задач и ресурсов.
          </p>
        </div>

        <ul class="mt-8 grid list-none gap-4 p-0 tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-3">
          <li
            v-for="area in ngoSupportAreas"
            :key="area.id"
            class="min-w-0"
          >
            <NgoSupportCard
              :asset-id="area.assetId"
              :alt="area.alt"
              :title="area.title"
              :description="area.description"
            />
          </li>
        </ul>
      </section>

      <section
        class="mt-12 tablet:mt-16"
        aria-labelledby="ngo-materials-heading"
      >
        <h2 id="ngo-materials-heading">
          Полезные материалы
        </h2>
        <div class="grid gap-3">
          <DocumentRow
            v-for="material in ngoMaterials"
            :id="material.id"
            :key="material.id"
            :title="material.title"
            :description="material.description"
            :show-read-action="false"
            :href="material.file.availability === 'available' ? material.file.data.href : undefined"
            :format="material.file.availability === 'available' ? material.file.data.format : undefined"
          />
        </div>
      </section>

    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, watch } from 'vue'
import { useRoute, useRouter, useSeoMeta } from '#imports'
import { productionDocuments } from '~/constants/documentsAndReports'
import { previewDocuments } from '~/constants/mocks/documentsAndReports'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { selectDeploymentContent } from '~/utils/preview/selectDeploymentContent'
import { readQueryValue } from '~/utils/query/readQueryValue'

defineOptions({ name: 'AboutDocumentsPage' })

const route = useRoute()
const router = useRouter()
const isPreviewMode = useDeploymentPreview()

const documents = computed(() => selectDeploymentContent({
  previewMode: isPreviewMode.value,
  production: productionDocuments,
  preview: previewDocuments,
}))

const selectedDocumentId = computed(() => readQueryValue(route.query.document) || 'charter')
const selectedDocument = computed(() => documents.value.find(document => document.id === selectedDocumentId.value))

const tocItems = [
  { id: 'documents-intro', label: 'Назначение документов' },
  { id: 'documents-list', label: 'Документы Ресурсного центра' },
  { id: 'document-reader', label: 'Текст документа' },
  { id: 'documents-help', label: 'Вопросы и поддержка' },
]

useSeoMeta({
  title: 'Уставные документы',
  description: 'Документы Ресурсного центра и доступные текстовые версии.',
})

onMounted(() => {
  if (!readQueryValue(route.query.document)) {
    void router.replace({
      path: route.path,
      query: {
        ...route.query,
        document: 'charter',
      },
      hash: route.hash,
    })
  }
})

watch(
  () => route.fullPath,
  async () => {
    if (route.hash !== '#document-reader') {
      return
    }

    await nextTick()
    window.setTimeout(() => {
      document.getElementById('document-reader-document-heading')?.focus({ preventScroll: true })
    }, 50)
  },
  { flush: 'post' },
)

</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'О нас', to: '/about' },
          { label: 'Уставные документы' },
        ]"
        class="mb-8"
      />

      <div
        id="documents-intro"
        class="scroll-mt-28"
      >
        <PageIntro
          title="Уставные документы"
          lead="Мы действуем открыто и прозрачно. Здесь собраны документы Ресурсного центра для свободного ознакомления."
          :media="{
            assetId: 'document-folder',
            alt: 'Папка с документами Ресурсного центра',
            width: 720,
            height: 480,
            caption: isPreviewMode ? 'Демонстрационный материал: папка с документами' : 'Фотография будет добавлена',
            loading: 'eager',
          }"
        />
      </div>

      <section
        id="documents-list"
        class="mt-12 scroll-mt-28 tablet:mt-16"
        aria-labelledby="documents-list-heading"
      >
        <h2 id="documents-list-heading">
          Документы Ресурсного центра
        </h2>
        <div class="grid gap-3">
          <DocumentRow
            v-for="item in documents"
            :id="item.id"
            :key="item.id"
            :title="item.title"
            :description="item.description"
            :available="item.textVersion.availability === 'available'"
            :href="item.file.availability === 'available' ? item.file.data.href : undefined"
            :format="item.file.availability === 'available' ? item.file.data.format : undefined"
            read-target="#document-reader"
          />
        </div>
      </section>

      <div class="mt-12 grid gap-8 tablet:mt-16 desktop:grid-cols-[minmax(0,1fr)_16rem]">
        <div class="desktop:order-2">
          <ArticleToc
            :items="tocItems"
            title="Содержание"
          />
        </div>

        <DocumentReader
          class="desktop:order-1"
          :title="selectedDocument?.title"
          :text-version="selectedDocument?.textVersion"
          :missing-message="`Документ с идентификатором «${selectedDocumentId}» не найден. Выберите документ из списка выше.`"
        />
      </div>
    </Container>

    <ContactBand
      id="documents-help"
      class="mt-12 tablet:mt-16"
      title="Не нашли нужный документ?"
      text="Напишите нам — подскажем, где найти нужную информацию."
    />
  </div>
</template>

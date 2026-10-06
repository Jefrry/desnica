<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, useSeoMeta } from '#imports'
import { productionReports } from '~/constants/documentsAndReports'
import { previewReports } from '~/constants/mocks/documentsAndReports'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { selectDeploymentContent } from '~/utils/preview/selectDeploymentContent'
import { readQueryValue } from '~/utils/query/readQueryValue'

defineOptions({ name: 'AboutReportsPage' })

const route = useRoute()
const router = useRouter()
const isPreviewMode = useDeploymentPreview()
const pendingFocusYear = ref<string>()

const reports = computed(() => selectDeploymentContent({
  previewMode: isPreviewMode.value,
  production: productionReports,
  preview: previewReports,
}))

const years = computed(() => reports.value.map(report => report.year))
const selectedYear = computed(() => readQueryValue(route.query.year) || years.value[0] || '2025')
const selectedReport = computed(() => reports.value.find(report => report.year === selectedYear.value))
const archiveYears = computed(() => years.value.filter(year => year !== selectedYear.value))
const showReader = computed(() => route.hash === '#report-reader' && Boolean(selectedReport.value))

useSeoMeta({
  title: 'Годовая отчётность',
  description: 'Годовые отчёты Ресурсного центра и доступные текстовые версии.',
})

onMounted(() => {
  if (!readQueryValue(route.query.year)) {
    void router.replace({
      path: route.path,
      query: {
        ...route.query,
        year: selectedYear.value,
      },
      hash: route.hash,
    })
  }

  if (showReader.value) {
    void scrollToReportReader()
  }
})

watch(
  () => selectedYear.value,
  async (year) => {
    if (pendingFocusYear.value !== year) {
      return
    }

    pendingFocusYear.value = undefined
    await nextTick()
    window.requestAnimationFrame(() => {
      document.getElementById('report-panel-heading')?.focus({ preventScroll: true })
    })
  },
)

watch(showReader, (isVisible) => {
  if (isVisible) {
    void scrollToReportReader()
  }
})

function handleYearSelect(year: string) {
  void router.push({
    path: route.path,
    query: {
      ...route.query,
      year,
    },
  })
}

function handleArchiveSelect(year: string) {
  pendingFocusYear.value = year
}

async function scrollToReportReader() {
  await nextTick()
  window.requestAnimationFrame(() => {
    document.getElementById('report-reader')?.scrollIntoView()
  })
}
</script>

<template>
  <div>
    <Container>
      <Breadcrumbs
        :items="[
          { label: 'Главная', to: '/' },
          { label: 'О нас', to: '/about' },
          { label: 'Годовая отчётность' },
        ]"
        class="mb-8"
      />

      <PageIntro
        title="Годовая отчётность"
        lead="Рассказываем о работе Ресурсного центра открыто и понятно."
        :media="{
          assetId: 'team-meeting',
          alt: 'Команда Ресурсного центра обсуждает работу',
          width: 720,
          height: 480,
          caption: isPreviewMode ? 'Демонстрационный материал: рабочая встреча' : 'Фотография будет добавлена',
          loading: 'eager',
        }"
      />

      <div class="mt-10">
        <YearSelect
          :years="years"
          :model-value="selectedYear"
          @update:model-value="handleYearSelect"
        />
      </div>

      <div class="mt-10 tablet:mt-12">
        <ReportPanel
          :report="selectedReport"
          :archive-years="archiveYears"
          :unknown-year="selectedYear"
          @select-year="handleArchiveSelect"
        >
          <template #reader>
            <DocumentReader
              v-if="showReader && selectedReport"
              id="report-reader"
              heading-id="report-reader-heading"
              document-heading-id="report-reader-document-heading"
              class="mt-12 tablet:mt-16"
              :title="`Отчёт за ${selectedReport.year} год`"
              :text-version="selectedReport.textVersion"
            />
          </template>
        </ReportPanel>
      </div>

      <section
        id="about-annual-reports"
        class="mt-12 grid scroll-mt-28 gap-6 tablet:mt-16 tablet:grid-cols-2 tablet:items-start"
        aria-labelledby="about-annual-reports-heading"
      >
        <FigureMedia
          class="tablet:order-1"
          asset-id="annual-review"
          alt="Обсуждение годового отчёта"
          :width="720"
          :height="480"
          :caption="isPreviewMode ? 'Демонстрационный материал: обсуждение отчёта' : 'Фотография будет добавлена'"
        />
        <div class="min-w-0 tablet:order-2">
          <h2 id="about-annual-reports-heading">
            О годовой отчётности
          </h2>
          <p>
            Годовой отчёт помогает понять, как организация работает над своими задачами. В нём можно рассказать о программах, участниках, сотрудничестве и использовании ресурсов.
          </p>
          <p>
            До публикации реальные сведения проходят проверку, а текстовая версия согласуется с файлом отчёта.
          </p>
        </div>
      </section>
    </Container>

    <ContactBand
      class="mt-12 tablet:mt-16"
      title="Остались вопросы по отчётности?"
      text="Напишите нам — обсудим детали и подскажем, где найти нужную информацию."
      cta-to="/contacts?topic=reports#contact-form"
    />
  </div>
</template>

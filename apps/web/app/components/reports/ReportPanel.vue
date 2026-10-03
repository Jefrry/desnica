<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'
import type { AnnualReport } from '~/types/document/document'

defineOptions({ name: 'ReportPanel' })

interface Props {
  report?: AnnualReport
  archiveYears: readonly string[]
  unknownYear?: string
}

const props = withDefaults(defineProps<Props>(), {
  report: undefined,
  unknownYear: undefined,
})

const emit = defineEmits<{
  selectYear: [year: string]
}>()

const route = useRoute()

const reportTitle = computed(() => props.report ? `Отчёт за ${props.report.year} год` : 'Отчёт не найден')

function yearLocation(year: string) {
  return {
    path: route.path,
    query: {
      ...route.query,
      year,
    },
    hash: '#report-panel',
  }
}
</script>

<template>
  <div>
    <section
      id="report-panel"
      aria-labelledby="report-panel-heading"
      class="scroll-mt-28"
    >
      <h2
        id="report-panel-heading"
        class="focus:outline-none"
        tabindex="-1"
      >
        {{ reportTitle }}
      </h2>

      <InlineNotice
        v-if="!report"
        kind="error"
        :text="`Отчёт за ${unknownYear || 'указанный'} год не найден. Выберите доступный год.`"
      />

      <template v-else>
        <p class="text-intro mb-6">
          {{ report.textVersion.availability === 'available' && report.textVersion.source.kind === 'demonstration'
            ? 'Пример структуры отчёта'
            : 'Материалы годового отчёта' }}
        </p>

        <div class="grid gap-6 desktop:grid-cols-[minmax(0,1.25fr)_minmax(17rem,0.75fr)]">
          <FeatureList :items="[...report.features]" />

          <div class="min-w-0 rounded-card border border-border-subtle bg-surface p-4">
            <div
              v-if="report.cover.availability === 'available'"
              class="relative aspect-[4/5] overflow-hidden rounded-card border border-border-subtle bg-surface-accent p-6"
              role="img"
              :aria-label="report.cover.data.alt"
              :data-asset-id="report.cover.data.assetId"
            >
              <span class="absolute -top-10 -right-10 size-40 rounded-full bg-brand opacity-90" />
              <span class="absolute top-24 -right-6 size-24 rounded-full bg-brand opacity-70" />
              <div class="relative flex h-full flex-col justify-between">
                <p class="m-0 text-control font-bold text-brand">
                  Ресурсный центр
                </p>
                <p class="m-0 text-h2-mobile font-bold leading-tight text-ink tablet:text-h2-tablet">
                  Годовой<br>отчёт<br>{{ report.year }}
                </p>
                <p class="m-0 text-caption text-muted">
                  Демонстрационная обложка
                </p>
              </div>
            </div>

            <div
              v-else
              class="flex aspect-[4/5] items-center justify-center rounded-card border border-border-subtle bg-surface-subtle p-6 text-center text-muted"
              role="img"
              :aria-label="report.cover.message"
            >
              {{ report.cover.message }}
            </div>

            <div class="mt-4 flex flex-wrap gap-3">
              <ActionLink
                v-if="report.textVersion.availability === 'available'"
                :to="{ path: route.path, query: route.query, hash: '#report-reader' }"
              >
                Читать отчёт
              </ActionLink>
              <ActionLink
                v-else
              >
                Читать отчёт
              </ActionLink>

              <ActionLink
                v-if="report.file.availability === 'available'"
                :href="report.file.data.href"
                variant="secondary"
              >
                Скачать {{ report.file.data.format }}
              </ActionLink>
              <ActionLink
                v-else
                variant="secondary"
              >
                Скачать PDF
              </ActionLink>
            </div>
          </div>
        </div>
      </template>
    </section>

    <slot name="reader" />

    <section
      class="mt-10"
      aria-labelledby="report-archive-heading"
    >
      <h2 id="report-archive-heading">
        Архив отчётов
      </h2>
      <ul class="m-0 grid list-none gap-3 p-0">
        <li
          v-for="year in archiveYears"
          :key="year"
          class="flex flex-wrap items-center justify-between gap-3 rounded-card border border-border-subtle bg-surface p-4"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="inline-grid size-11 shrink-0 place-items-center rounded-card bg-surface-accent text-brand">
              <DecorativeIcon
                name="document"
                class="size-6"
              />
            </span>
            <span class="font-bold text-ink">{{ year }} год</span>
          </span>
          <NuxtLink
            :to="yearLocation(year)"
            class="inline-flex min-h-control items-center font-semibold"
            @click="emit('selectYear', year)"
          >
            Показать отчёт
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

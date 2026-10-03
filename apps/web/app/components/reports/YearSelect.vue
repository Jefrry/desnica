<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'YearSelect' })

interface Props {
  years: readonly string[]
  modelValue: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Год отчёта',
})

const emit = defineEmits<{
  'update:modelValue': [year: string]
}>()

const statusMessage = ref('')

function handleChange(event: Event) {
  const target = event.target

  if (!(target instanceof HTMLSelectElement)) {
    return
  }

  statusMessage.value = ''
  emit('update:modelValue', target.value)
  target.focus()

  window.requestAnimationFrame(() => {
    statusMessage.value = `Показан отчёт за ${target.value} год`
  })
}
</script>

<template>
  <div class="max-w-64">
    <label
      for="report-year"
      class="mb-2 block text-control font-bold text-ink"
    >{{ label }}</label>
    <select
      id="report-year"
      :value="modelValue"
      class="min-h-control w-full rounded-control border-2 border-brand bg-surface px-4 py-2 text-control font-semibold text-ink focus-visible:border-focus focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-focus"
      @change="handleChange"
    >
      <option
        v-if="!years.includes(modelValue)"
        :value="modelValue"
      >
        Недоступный год: {{ modelValue }}
      </option>
      <option
        v-for="year in years"
        :key="year"
        :value="year"
      >
        {{ year }}
      </option>
    </select>
    <span
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >{{ statusMessage }}</span>
  </div>
</template>

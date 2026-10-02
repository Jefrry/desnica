<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'

defineOptions({ name: 'InlineNotice' })

const props = defineProps({
  kind: {
    type: String,
    default: 'info',
    validator: value => ['info', 'error', 'success'].includes(value),
  },
  text: {
    type: String,
    required: true,
  },
  announceChange: {
    type: Boolean,
    default: false,
  },
})

const labels = {
  info: 'Информация',
  error: 'Ошибка',
  success: 'Успешно',
}

const markers = {
  info: 'i',
  error: '!',
  success: '✓',
}

const noticeClasses = {
  info: 'border-brand-active bg-surface-accent text-brand-active',
  error: 'border-error bg-error-surface text-error',
  success: 'border-success bg-success-surface text-success',
}

const liveMessage = ref('')

async function announce() {
  liveMessage.value = ''
  await nextTick()

  if (props.announceChange) {
    liveMessage.value = `${labels[props.kind]}. ${props.text}`
  }
}

onMounted(announce)
watch(() => [props.kind, props.text, props.announceChange], announce)
</script>

<template>
  <div
    class="flex items-start gap-3 rounded-card border p-4"
    :class="noticeClasses[kind]"
  >
    <span
      class="mt-0.5 inline-grid size-6 shrink-0 place-items-center rounded-full border-2 border-current text-sm font-bold leading-none"
      aria-hidden="true"
    >{{ markers[kind] }}</span>

    <div class="min-w-0 flex-1">
      <div>
        <span class="text-control font-bold">{{ labels[kind] }}.</span>
        <span class="ml-1 text-ink"> {{ text }}</span>
      </div>

      <div
        v-if="$slots.action"
        class="mt-3"
      >
        <slot name="action" />
      </div>
    </div>

    <span
      class="sr-only"
      :role="kind === 'error' ? 'alert' : 'status'"
      :aria-live="kind === 'error' ? 'assertive' : 'polite'"
      aria-atomic="true"
    >{{ liveMessage }}</span>
  </div>
</template>

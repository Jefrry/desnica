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
    class="inline-notice"
    :class="`inline-notice--${kind}`"
  >
    <span
      class="inline-notice__marker"
      aria-hidden="true"
    >{{ markers[kind] }}</span>

    <div class="inline-notice__body">
      <div>
        <span class="inline-notice__label">{{ labels[kind] }}.</span>
        <span class="inline-notice__text"> {{ text }}</span>
      </div>

      <div
        v-if="$slots.action"
        class="inline-notice__action"
      >
        <slot name="action" />
      </div>
    </div>

    <span
      class="visually-hidden"
      :role="kind === 'error' ? 'alert' : 'status'"
      :aria-live="kind === 'error' ? 'assertive' : 'polite'"
      aria-atomic="true"
    >{{ liveMessage }}</span>
  </div>
</template>

<style scoped>
.inline-notice {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border: var(--border-width) solid currentcolor;
  border-radius: var(--radius-card);
  color: var(--color-brand-active);
  background: var(--color-surface-accent);
}

.inline-notice--error {
  color: var(--color-error);
  background: var(--color-error-surface);
}

.inline-notice--success {
  color: var(--color-success);
  background: var(--color-success-surface);
}

.inline-notice__marker {
  display: inline-grid;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  place-items: center;
  margin-top: 0.125rem;
  border: 2px solid currentcolor;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1;
}

.inline-notice__body {
  min-width: 0;
  flex: 1;
}

.inline-notice__label {
  font-size: var(--font-size-control);
  font-weight: 700;
  line-height: var(--line-height-control);
}

.inline-notice__text {
  margin-inline-start: var(--space-1);
  color: var(--color-text-primary);
}

.inline-notice__action {
  margin-top: var(--space-3);
}
</style>

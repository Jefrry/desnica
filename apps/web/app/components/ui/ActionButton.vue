<script setup>
defineOptions({ name: 'ActionButton' })

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'text'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
    validator: value => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingLabel: {
    type: String,
    default: 'Выполняется',
  },
})

const emit = defineEmits(['click'])

function handleClick(event) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    class="action-control"
    :class="`action-control--${variant}`"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-label="loading ? loadingLabel : undefined"
    @click="handleClick"
  >
    <span
      class="action-control__content"
      :class="{ 'action-control__content--loading': loading }"
      :aria-hidden="loading || undefined"
    >
      <slot />
    </span>

    <span
      v-if="loading"
      class="action-control__loader"
      aria-hidden="true"
    >
      <span class="action-control__spinner" />
    </span>

    <span
      class="visually-hidden"
      aria-live="polite"
      aria-atomic="true"
    >{{ loading ? loadingLabel : '' }}</span>
  </button>
</template>

<style scoped>
.action-control {
  position: relative;
  display: inline-flex;
  min-height: var(--control-min-height);
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  max-width: 100%;
  padding: 0.6875rem var(--space-6);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-control);
  font-size: var(--font-size-control);
  font-weight: 600;
  line-height: var(--line-height-control);
  text-align: center;
  text-decoration: none;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}

.action-control--primary {
  border-color: var(--color-brand-primary);
  color: var(--color-surface);
  background: var(--color-brand-primary);
}

.action-control--primary:hover {
  border-color: var(--color-brand-hover);
  color: var(--color-surface);
  background: var(--color-brand-hover);
}

.action-control--primary:active {
  border-color: var(--color-brand-active);
  color: var(--color-surface);
  background: var(--color-brand-active);
}

.action-control--secondary {
  border-color: var(--color-brand-primary);
  color: var(--color-brand-primary);
  background: var(--color-surface);
}

.action-control--secondary:hover {
  border-color: var(--color-brand-hover);
  color: var(--color-brand-hover);
  background: var(--color-surface-accent);
}

.action-control--secondary:active {
  border-color: var(--color-brand-active);
  color: var(--color-brand-active);
  background: var(--color-border-subtle);
}

.action-control--text {
  justify-content: flex-start;
  padding-inline: 0;
  border: 0;
  color: var(--color-brand-primary);
  background: transparent;
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.2em;
}

.action-control--text:hover {
  color: var(--color-brand-hover);
  text-decoration-thickness: 0.14em;
}

.action-control--text:active {
  color: var(--color-brand-active);
}

.action-control:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.action-control--primary:focus-visible {
  box-shadow: 0 0 0 3px var(--color-surface);
  outline-offset: 5px;
}

.action-control:disabled {
  border-color: var(--color-border-control);
  color: var(--color-text-secondary);
  background: var(--color-surface-subtle);
  cursor: not-allowed;
}

.action-control--primary:disabled {
  color: var(--color-surface);
  background: var(--color-border-control);
}

.action-control--text:disabled {
  border: 0;
  color: var(--color-text-secondary);
  background: transparent;
  text-decoration: underline;
}

.action-control__content--loading {
  visibility: hidden;
}

.action-control__loader {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.action-control__spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid currentcolor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: action-spin 700ms linear infinite;
}

@keyframes action-spin {
  to {
    transform: rotate(1turn);
  }
}

@media (max-width: 22.4375rem) {
  .action-control:not(.action-control--text) {
    width: 100%;
  }
}
</style>

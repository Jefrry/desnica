<script setup>
defineOptions({ name: 'ActionLink' })

defineProps({
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'text'].includes(value),
  },
  target: {
    type: String,
    default: '_self',
    validator: value => ['_blank', '_self'].includes(value),
  },
  rel: {
    type: String,
    default: undefined,
  },
  unavailableReason: {
    type: String,
    default: 'ссылка пока недоступна',
  },
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="action-control"
    :class="`action-control--${variant}`"
  >
    <slot />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    class="action-control"
    :class="`action-control--${variant}`"
    :target="target"
    :rel="rel || (target === '_blank' ? 'noopener noreferrer' : undefined)"
  >
    <slot />
  </a>

  <span
    v-else
    class="action-unavailable"
  >
    <slot />
    <span class="action-unavailable__reason"> ({{ unavailableReason }})</span>
  </span>
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

.action-unavailable {
  color: var(--color-text-secondary);
  font-size: var(--font-size-control);
  line-height: var(--line-height-control);
}

.action-unavailable__reason {
  font-style: normal;
}

@media (max-width: 22.4375rem) {
  .action-control:not(.action-control--text) {
    width: 100%;
  }
}
</style>

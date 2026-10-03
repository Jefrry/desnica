<script setup lang="ts">
defineOptions({ name: 'ActionButton' })

type ActionVariant = 'primary' | 'secondary' | 'text'

interface Props {
  variant?: ActionVariant
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false,
  loadingLabel: 'Выполняется',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const actionBaseClasses = 'relative inline-flex min-h-control max-w-full cursor-pointer items-center gap-2 rounded-control border py-[0.6875rem] text-center text-control font-semibold [overflow-wrap:anywhere] transition-colors focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px] disabled:cursor-not-allowed'

const variantClasses: Record<ActionVariant, string> = {
  primary: 'justify-center border-brand bg-brand px-6 text-surface hover:border-brand-hover hover:bg-brand-hover active:border-brand-active active:bg-brand-active focus-visible:ring-[3px] focus-visible:ring-surface focus-visible:outline-offset-[5px] disabled:border-border-control disabled:bg-border-control disabled:text-surface disabled:hover:border-border-control disabled:hover:bg-border-control max-[22.4375rem]:w-full',
  secondary: 'justify-center border-brand bg-surface px-6 text-brand hover:border-brand-hover hover:bg-surface-accent hover:text-brand-hover active:border-brand-active active:bg-border-subtle active:text-brand-active disabled:border-border-control disabled:bg-surface-subtle disabled:text-muted disabled:hover:border-border-control disabled:hover:bg-surface-subtle disabled:hover:text-muted max-[22.4375rem]:w-full',
  text: 'justify-start border-0 bg-transparent px-0 text-brand underline decoration-[0.08em] underline-offset-[0.2em] hover:text-brand-hover hover:decoration-[0.14em] active:text-brand-active disabled:border-0 disabled:bg-transparent disabled:text-muted disabled:hover:bg-transparent disabled:hover:text-muted',
}

function handleClick(event: MouseEvent) {
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
    :class="[actionBaseClasses, variantClasses[variant]]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-label="loading ? loadingLabel : undefined"
    @click="handleClick"
  >
    <span
      :class="{ invisible: loading }"
      :aria-hidden="loading || undefined"
    >
      <slot />
    </span>

    <span
      v-if="loading"
      class="absolute inset-0 grid place-items-center"
      aria-hidden="true"
    >
      <span class="size-5 animate-spin rounded-full border-2 border-current border-r-transparent [animation-duration:700ms]" />
    </span>

    <span
      class="sr-only"
      aria-live="polite"
      aria-atomic="true"
    >{{ loading ? loadingLabel : '' }}</span>
  </button>
</template>

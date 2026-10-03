<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineOptions({ name: 'ActionLink' })

type ActionVariant = 'primary' | 'secondary' | 'text'

interface Props {
  to?: RouteLocationRaw
  href?: string
  variant?: ActionVariant
  target?: '_blank' | '_self'
  rel?: string
}

const actionBaseClasses = 'relative inline-flex min-h-control max-w-full items-center gap-2 rounded-control border py-[0.6875rem] text-center text-control font-semibold [overflow-wrap:anywhere] no-underline transition-colors focus-visible:outline-[3px] focus-visible:outline-focus focus-visible:outline-offset-[3px]'

const variantClasses: Record<ActionVariant, string> = {
  primary: 'justify-center border-brand bg-brand px-6 text-surface hover:border-brand-hover hover:bg-brand-hover hover:text-surface hover:no-underline active:border-brand-active active:bg-brand-active active:text-surface focus-visible:ring-[3px] focus-visible:ring-surface focus-visible:outline-offset-[5px] max-[22.4375rem]:w-full',
  secondary: 'justify-center border-brand bg-surface px-6 text-brand hover:border-brand-hover hover:bg-surface-accent hover:text-brand-hover hover:no-underline active:border-brand-active active:bg-border-subtle active:text-brand-active max-[22.4375rem]:w-full',
  text: 'justify-start border-0 bg-transparent px-0 text-brand underline decoration-[0.08em] underline-offset-[0.2em] hover:text-brand-hover hover:decoration-[0.14em] active:text-brand-active',
}

withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  variant: 'primary',
  target: '_self',
  rel: undefined,
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[actionBaseClasses, variantClasses[variant]]"
  >
    <slot />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    :class="[actionBaseClasses, variantClasses[variant]]"
    :target="target"
    :rel="rel || (target === '_blank' ? 'noopener noreferrer' : undefined)"
  >
    <slot />
  </a>

  <span
    v-else
    class="text-control text-muted"
  >
    <slot />
  </span>
</template>

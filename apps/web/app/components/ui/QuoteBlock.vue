<script setup lang="ts">
defineOptions({ name: 'QuoteBlock' })

interface Props {
  text: string
  citation?: string
  tone?: 'accent' | 'surface'
}

withDefaults(defineProps<Props>(), {
  citation: '',
  tone: 'accent',
})
</script>

<template>
  <blockquote
    class="relative m-0 min-w-0 overflow-hidden rounded-card border-l-4 border-brand px-5 py-6 phone:pl-20 tablet:px-24 tablet:py-8"
    :class="tone === 'accent' ? 'bg-surface-accent' : 'border-y border-r border-border-subtle bg-surface'"
  >
    <span
      class="pointer-events-none mb-2 block font-serif text-7xl leading-[0.6] text-brand/20 phone:absolute phone:left-5 phone:top-8 phone:mb-0 tablet:left-7 tablet:text-8xl"
      aria-hidden="true"
    >“</span>
    <p class="m-0 text-intro font-semibold text-ink">
      «{{ text }}»
    </p>
    <footer
      v-if="citation"
      class="mt-3 text-caption text-muted"
    >
      — <cite class="not-italic">{{ citation }}</cite>
    </footer>
  </blockquote>
</template>

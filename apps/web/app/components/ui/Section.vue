<script setup lang="ts">
defineOptions({ name: 'ContentSection' })

type SectionTone = 'default' | 'subtle' | 'accent'

interface Props {
  id: string
  title: string
  headingLevel: 'h2' | 'h3'
  tone?: SectionTone
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'default',
})

const headingId = `${props.id}-title`

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-surface',
  subtle: 'bg-surface-subtle',
  accent: 'bg-surface-accent',
}
</script>

<template>
  <section
    :id="id"
    class="bg-surface text-ink"
    :class="toneClasses[tone]"
    :aria-labelledby="headingId"
  >
    <Container class="py-section-block-mobile tablet:py-section-block">
      <component
        :is="headingLevel"
        :id="headingId"
        class="mb-6"
      >
        {{ title }}
      </component>

      <slot />
    </Container>
  </section>
</template>

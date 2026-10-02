<script setup>
defineOptions({ name: 'ContentSection' })

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  headingLevel: {
    type: String,
    required: true,
    validator: value => ['h2', 'h3'].includes(value),
  },
  tone: {
    type: String,
    default: 'default',
    validator: value => ['default', 'subtle', 'accent'].includes(value),
  },
})

const headingId = `${props.id}-title`

const toneClasses = {
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

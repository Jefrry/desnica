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
</script>

<template>
  <section
    :id="id"
    class="content-section"
    :class="`content-section--${tone}`"
    :aria-labelledby="headingId"
  >
    <Container class="content-section__inner">
      <component
        :is="headingLevel"
        :id="headingId"
        class="content-section__heading"
      >
        {{ title }}
      </component>

      <slot />
    </Container>
  </section>
</template>

<style scoped>
.content-section {
  color: var(--color-text-primary);
  background: var(--color-surface);
}

.content-section--subtle {
  background: var(--color-surface-subtle);
}

.content-section--accent {
  background: var(--color-surface-accent);
}

.content-section__inner {
  padding-block: var(--section-block-padding);
}

.content-section__heading {
  margin-block-end: var(--space-6);
}
</style>

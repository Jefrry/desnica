<script setup>
defineOptions({ name: 'PageIntro' })

defineProps({
  title: {
    type: String,
    required: true,
  },
  lead: {
    type: String,
    required: true,
  },
  headingId: {
    type: String,
    default: 'page-title',
  },
  actions: {
    type: Array,
    default: () => [],
  },
  media: {
    type: Object,
    default: undefined,
  },
})
</script>

<template>
  <section
    :aria-labelledby="headingId"
    class="grid items-start gap-8 tablet:gap-10"
    :class="media ? 'tablet:grid-cols-2' : ''"
  >
    <div class="min-w-0">
      <h1 :id="headingId">
        {{ title }}
      </h1>

      <p class="text-intro mb-4 max-w-[42rem]">
        {{ lead }}
      </p>

      <div
        v-if="$slots.body"
        class="mb-6 max-w-[42rem] text-body text-muted"
      >
        <slot name="body" />
      </div>

      <div
        v-if="actions.length"
        class="flex flex-wrap gap-3"
      >
        <ActionLink
          v-for="action in actions"
          :key="action.label"
          :to="action.to"
          :variant="action.variant || 'primary'"
        >
          {{ action.label }}
        </ActionLink>
      </div>
    </div>

    <FigureMedia
      v-if="media"
      :asset-id="media.assetId"
      :src="media.src"
      :alt="media.alt"
      :width="media.width"
      :height="media.height"
      :ratio="media.ratio"
      :focal-point="media.focalPoint"
      :caption="media.caption"
      :loading="media.loading || 'eager'"
    />
  </section>
</template>

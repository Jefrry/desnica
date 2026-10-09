<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineOptions({ name: 'HomeHero' })

interface HeroAction {
  label: string
  to: RouteLocationRaw
  variant?: 'primary' | 'secondary' | 'text'
}

interface Props {
  title: string
  lead: string
  actions?: HeroAction[]
  headingId?: string
  logoSrc?: string
  logoAlt?: string
  logoCaption?: string
}

withDefaults(defineProps<Props>(), {
  actions: () => [],
  headingId: 'page-title',
  logoSrc: '/images/resource-center-logo-color.jpg',
  logoAlt: 'Ресурсный центр по вопросам инвалидности, как способ занятости молодых людей с инвалидностью',
  logoCaption: 'Ресурсный центр',
})
</script>

<template>
  <section
    :aria-labelledby="headingId"
    class="grid items-center gap-8 tablet:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] tablet:gap-10"
  >
    <div class="min-w-0">
      <h1
        :id="headingId"
        class="heading-display mb-6"
      >
        {{ title }}
      </h1>

      <p class="text-intro mb-6 max-w-[39rem]">
        {{ lead }}
      </p>

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

    <figure
      class="m-0 min-w-0 bg-surface p-4 phone:p-6 tablet:p-8"
      :aria-label="logoCaption"
    >
      <img
        :src="logoSrc"
        :alt="logoAlt"
        width="1885"
        height="791"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="block h-auto w-full object-contain"
      >
      <figcaption class="sr-only">
        {{ logoCaption }}
      </figcaption>
    </figure>
  </section>
</template>

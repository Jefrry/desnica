<script setup lang="ts">
defineOptions({ name: 'ProgramCard' })

interface Props {
  assetId: string
  src?: string
  alt: string
  audience: string
  title: string
  description: string
}

withDefaults(defineProps<Props>(), {
  src: '',
})
</script>

<template>
  <article class="min-w-0 overflow-hidden rounded-card border border-border-subtle bg-surface">
    <div class="relative">
      <FigureMedia
        :asset-id="assetId"
        :src="src"
        :alt="alt"
        :width="1600"
        :height="900"
        ratio="16 / 9"
        class="[&_[role=img]>span:last-child]:sr-only [&>div]:rounded-none [&>div]:border-0"
      />
      <p class="absolute right-3 bottom-3 left-3 m-0 w-fit max-w-[calc(100%-1.5rem)] rounded-control border border-border-subtle bg-surface px-3 py-1 text-caption font-semibold text-brand">
        {{ audience }}
      </p>
    </div>

    <div class="p-4 tablet:p-6">
      <h3>{{ title }}</h3>
      <p class="text-caption text-muted">
        {{ description }}
      </p>
      <ActionLink
        to="/contacts"
        variant="secondary"
      >
        Узнать о программе
        <span class="sr-only">: {{ title }}</span>
      </ActionLink>
    </div>
  </article>
</template>

<script setup lang="ts">
defineOptions({ name: 'PreviewBanner' })
</script>

<template>
  <aside
    class="border-b border-brand-active bg-surface-accent py-3 text-ink"
    aria-label="Режим предпросмотра"
  >
    <Container class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <strong class="text-control text-brand-active">
        Демонстрационное наполнение
      </strong>
      <span class="text-caption">
        Материалы предназначены для проверки макета и не подтверждают реальные факты или действия.
      </span>
    </Container>
  </aside>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppFooter' })

interface Props {
  copyright?: string
  legalTo?: string
}

withDefaults(defineProps<Props>(), {
  copyright: '© Ресурсный центр',
  legalTo: '/legal',
})
</script>

<template>
  <footer class="border-t border-border-subtle py-5 text-caption text-muted">
    <Container class="flex flex-wrap items-center justify-start gap-2 tablet:flex-nowrap tablet:justify-between tablet:gap-x-6">
      <p class="m-0">
        {{ copyright }}
      </p>

      <span
        class="tablet:hidden"
        aria-hidden="true"
      >·</span>

      <NuxtLink :to="legalTo">
        Правовая информация
      </NuxtLink>
    </Container>
  </footer>
</template>

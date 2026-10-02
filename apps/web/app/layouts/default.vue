<script setup lang="ts">
defineOptions({ name: 'DefaultLayout' })
</script>

<template>
  <div class="site-shell">
    <a
      class="skip-link"
      href="#main-content"
    >
      Перейти к содержимому
    </a>

    <AppHeader />

    <AppMain>
      <slot />
    </AppMain>

    <AppFooter />
  </div>
</template>

<style scoped>
.site-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.skip-link {
  position: fixed;
  z-index: 100;
  top: var(--space-3);
  left: var(--space-3);
  padding: var(--space-3) var(--space-4);
  transform: translateY(-200%);
  border-radius: var(--radius-control);
  color: var(--color-surface);
  background: var(--color-text-primary);
  font-size: var(--font-size-control);
  font-weight: 600;
  line-height: var(--line-height-control);
}

.skip-link:focus {
  transform: translateY(0);
}
</style>

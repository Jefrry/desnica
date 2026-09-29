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

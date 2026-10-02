<template>
  <main
    id="main-content"
    class="site-main"
    tabindex="-1"
  >
    <slot />
  </main>
</template>

<style scoped>
.site-main {
  flex: 1;
  padding-block: var(--space-16);
}

.site-main:focus {
  outline: none;
}

@media (max-width: 47.9375rem) {
  .site-main {
    padding-block: var(--space-10);
  }
}
</style>

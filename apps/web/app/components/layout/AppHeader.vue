<template>
  <header class="site-header">
    <Container class="site-header__inner">
      <NuxtLink
        class="site-header__brand"
        to="/"
        aria-label="Десница — на главную"
      >
        Десница
      </NuxtLink>

      <AppNavigation />
    </Container>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: var(--border-width) solid var(--color-border-subtle);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  min-height: 5.5rem;
  padding-block: var(--space-4);
}

.site-header__brand {
  color: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
}

@media (max-width: 74.9375rem) {
  .site-header__brand {
    font-size: 1.375rem;
    line-height: 1.045;
  }
}

@media (max-width: 47.9375rem) {
  .site-header__inner {
    min-height: 4.5rem;
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-2);
  }

  .site-header__brand {
    font-size: 1.25rem;
    line-height: 1.05;
  }
}

@media (max-height: 31.25rem) {
  .site-header {
    position: static;
  }
}
</style>

<template>
  <header class="site-header sticky top-0 z-50 border-b border-border-subtle bg-surface">
    <Container class="flex min-h-18 items-center justify-between gap-8 py-2 tablet:min-h-22 tablet:py-4">
      <BrandLogo />

      <AppNavigation />
      <MobileNavigation />
    </Container>
  </header>
</template>

<style scoped>
@media (max-height: 31.25rem) {
  .site-header {
    position: static;
  }
}
</style>

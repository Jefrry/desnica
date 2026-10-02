<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <Container>
      <p>© {{ currentYear }} Десница</p>
    </Container>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: var(--border-width) solid var(--color-border-subtle);
  padding-block: 1.25rem;
  color: var(--color-text-secondary);
  font-size: var(--font-size-caption);
  line-height: var(--line-height-caption);
}

.site-footer p {
  margin: 0;
}
</style>

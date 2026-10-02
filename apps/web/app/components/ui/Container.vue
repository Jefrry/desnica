<script setup>
defineOptions({ name: 'LayoutContainer' })
</script>

<template>
  <div class="site-container">
    <slot />
  </div>
</template>

<style scoped>
.site-container {
  width: min(
    calc(100% - var(--page-gutter) - var(--page-gutter)),
    var(--container-max)
  );
  margin-inline: auto;
}
</style>

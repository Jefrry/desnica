<script setup>
defineOptions({ name: 'LayoutContainer' })
</script>

<template>
  <div class="mx-auto w-full max-w-shell px-4 phone:px-5 tablet:px-8">
    <slot />
  </div>
</template>

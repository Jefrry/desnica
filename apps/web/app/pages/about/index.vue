<script setup lang="ts">
import { useSeoMeta } from '#imports'

defineOptions({ name: 'AboutIndexPage' })

useSeoMeta({
  title: 'О нас',
  description: 'Информация о «Деснице».',
})
</script>

<template>
  <article class="page-section">
    <header>
      <h1>О нас</h1>
    </header>
    <p>
      Информация о «Деснице».
    </p>
  </article>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

defineOptions({ name: 'HomePage' })

useSeoMeta({
  title: 'Главная',
  description: 'Официальный сайт «Десница».',
})
</script>

<template>
  <section
    class="page-section"
    aria-labelledby="home-title"
  >
    <h1 id="home-title">
      Десница
    </h1>
    <p>
      Добро пожаловать на официальный сайт.
    </p>
  </section>
</template>

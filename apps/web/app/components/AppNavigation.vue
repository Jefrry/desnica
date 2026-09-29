<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'

defineOptions({ name: 'AppNavigation' })

const route = useRoute()
const navigationItems = [
  { label: 'Главная', to: '/' },
  { label: 'О нас', to: '/about' },
  { label: 'Новости', to: '/news' },
]

const currentPath = computed(() => route.path.replace(/\/$/, '') || '/')

function isCurrentSection(path = '') {
  return path === '/'
    ? currentPath.value === path
    : currentPath.value === path || currentPath.value.startsWith(`${path}/`)
}
</script>

<template>
  <nav aria-label="Основная навигация">
    <ul class="site-navigation">
      <li
        v-for="item in navigationItems"
        :key="item.to"
      >
        <NuxtLink
          class="site-navigation__link"
          :class="{ 'site-navigation__link--active': isCurrentSection(item.to) }"
          :to="item.to"
          :aria-current="currentPath === item.to ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

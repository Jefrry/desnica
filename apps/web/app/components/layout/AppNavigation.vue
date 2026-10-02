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

<style scoped>
.site-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-navigation__link {
  display: inline-block;
  padding-block: var(--space-2);
  color: inherit;
  font-size: var(--font-size-control);
  font-weight: 600;
  line-height: var(--line-height-control);
  text-underline-offset: 0.25em;
}

.site-navigation__link--active {
  color: var(--color-brand-primary);
  font-weight: 700;
  text-decoration-thickness: 0.14em;
}
</style>

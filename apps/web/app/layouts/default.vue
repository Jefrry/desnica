<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from '#imports'

defineOptions({ name: 'DefaultLayout' })

const route = useRoute()

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    document.getElementById('main-content')?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      class="fixed top-3 left-3 z-[100] -translate-y-[200%] rounded-control bg-ink px-4 py-3 text-control font-semibold text-surface no-underline focus:translate-y-0 focus:text-surface"
      href="#main-content"
    >
      Перейти к содержимому
    </a>

    <AppHeader />

    <AppMain>
      <slot />
    </AppMain>

    <AppFooter />
  </div>
</template>

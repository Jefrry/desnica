<script setup>
import { useAppNavigation } from './useAppNavigation'

defineOptions({ name: 'AppNavigation' })

const {
  closeDropdown,
  handleEscape,
  handleFocusOut,
  isCurrentPage,
  isCurrentSection,
  navigationItems,
  navigationRoot,
  openDropdown,
  toggleDropdown,
} = useAppNavigation()
</script>

<template>
  <nav
    ref="navigationRoot"
    class="desktop-navigation hidden desktop:block"
    aria-label="Основная навигация"
  >
    <ul class="m-0 flex list-none items-center gap-3 p-0">
      <li
        v-for="item in navigationItems"
        :key="item.key"
        class="relative"
        :style="item.children.length ? { '--dropdown-width': item.dropdownWidth } : undefined"
        @focusout="handleFocusOut($event, item.key)"
        @keydown.esc="handleEscape($event, item.key)"
      >
        <div class="flex items-center">
          <NuxtLink
            class="inline-flex min-h-control items-center rounded-control px-2 text-control font-semibold text-ink no-underline hover:text-brand-hover hover:underline hover:decoration-[0.12em] hover:underline-offset-[0.25em]"
            :class="isCurrentSection(item.to) ? 'site-navigation__link--active font-bold text-brand underline decoration-[0.12em] underline-offset-[0.25em]' : undefined"
            :to="item.to"
            :aria-current="isCurrentPage(item.to) ? 'page' : undefined"
            @click="closeDropdown"
          >
            {{ item.label }}
          </NuxtLink>

          <button
            v-if="item.children.length"
            class="inline-grid size-icon-control shrink-0 cursor-pointer place-items-center rounded-control border border-transparent bg-transparent p-0 text-ink hover:border-border-subtle hover:bg-surface-accent hover:text-brand-hover"
            :class="[
              isCurrentSection(item.to) ? 'text-brand' : undefined,
              openDropdown === item.key ? 'border-border-subtle bg-surface-accent text-brand-hover' : undefined,
            ]"
            type="button"
            :aria-label="`Открыть подразделы: ${item.label}`"
            :aria-expanded="openDropdown === item.key"
            :aria-controls="`desktop-subnav-${item.key}`"
            :data-dropdown-trigger="item.key"
            @click="toggleDropdown(item.key)"
          >
            <svg
              class="transition-transform"
              :class="{ 'rotate-180': openDropdown === item.key }"
              aria-hidden="true"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                d="m3.5 6 4.5 4 4.5-4"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="item.children.length"
          v-show="openDropdown === item.key"
          :id="`desktop-subnav-${item.key}`"
          class="absolute top-[calc(100%+0.25rem)] left-0 z-10 w-[var(--dropdown-width)] max-w-[calc(100vw-4rem)] rounded-card border border-border-subtle bg-surface p-2 shadow-menu"
        >
          <ul class="m-0 list-none divide-y divide-border-subtle p-0">
            <li
              v-for="child in item.children"
              :key="child.to"
            >
              <NuxtLink
                class="flex min-h-control items-center rounded-control p-3 text-control font-semibold text-ink no-underline [overflow-wrap:anywhere] hover:bg-surface-subtle hover:text-brand-hover hover:underline hover:underline-offset-[0.2em]"
                :class="isCurrentPage(child.to) ? 'bg-surface-accent font-bold text-brand underline underline-offset-[0.2em]' : undefined"
                :to="child.to"
                :aria-current="isCurrentPage(child.to) ? 'page' : undefined"
                @click="closeDropdown"
              >
                {{ child.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

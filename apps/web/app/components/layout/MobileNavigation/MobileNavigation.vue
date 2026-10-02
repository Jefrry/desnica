<script setup>
import { useMobileNavigation } from './useMobileNavigation'

defineOptions({ name: 'MobileNavigation' })

const mobileControlClasses = 'min-h-control items-center justify-center gap-2 rounded-control border border-transparent bg-transparent p-2 text-control font-semibold text-ink hover:bg-surface-accent hover:text-brand-hover'

const {
  closeButton,
  closeMenu,
  dialog,
  handleCancel,
  handleDialogClose,
  handleDialogKeydown,
  handleLinkClick,
  isCurrentPage,
  isCurrentSection,
  isGroupExpanded,
  menuButton,
  navigationItems,
  openMenu,
  toggleGroup,
} = useMobileNavigation()
</script>

<template>
  <button
    ref="menuButton"
    :class="[mobileControlClasses, 'mobile-navigation__open inline-flex cursor-pointer desktop:hidden']"
    type="button"
    aria-haspopup="dialog"
    aria-controls="mobile-navigation-dialog"
    @click="openMenu"
  >
    <span>Меню</span>
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
      />
    </svg>
  </button>

  <dialog
    id="mobile-navigation-dialog"
    ref="dialog"
    class="mobile-navigation__dialog m-0 hidden h-full h-dvh max-h-none w-full max-w-none flex-col border-0 bg-surface p-0 text-ink"
    aria-labelledby="mobile-navigation-title"
    aria-modal="true"
    @cancel="handleCancel"
    @close="handleDialogClose"
    @keydown="handleDialogKeydown"
  >
    <header class="shrink-0 border-b border-border-subtle bg-surface">
      <Container class="flex min-h-18 items-center justify-between gap-4 py-2">
        <BrandLogo @click="handleLinkClick" />

        <button
          ref="closeButton"
          :class="[mobileControlClasses, 'mobile-navigation__close inline-flex shrink-0 cursor-pointer']"
          type="button"
          @click="closeMenu('menu')"
        >
          <span>Закрыть</span>
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              d="m6 6 12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </Container>
    </header>

    <div class="flex-1 overflow-y-auto overscroll-contain pt-6 pb-10">
      <Container>
        <h2
          id="mobile-navigation-title"
          class="mb-4 text-2xl leading-[1.875rem]"
        >
          Навигация
        </h2>

        <nav aria-label="Мобильная навигация">
          <ul class="m-0 list-none p-0">
            <li
              v-for="item in navigationItems"
              :key="item.key"
              class="border-b border-border-subtle"
            >
              <template v-if="item.children.length">
                <button
                  class="mobile-navigation__group-toggle flex min-h-control w-full cursor-pointer items-center justify-between gap-4 rounded-control border-0 bg-transparent px-2 py-3 text-left text-control font-bold text-ink [overflow-wrap:anywhere] hover:bg-surface-accent hover:text-brand-hover"
                  :class="[
                    isCurrentSection(item.to) ? 'bg-surface-accent text-brand-hover' : undefined,
                    isGroupExpanded(item.key) ? 'bg-surface-accent text-brand-hover' : undefined,
                  ]"
                  type="button"
                  :aria-expanded="isGroupExpanded(item.key)"
                  :aria-controls="`mobile-subnav-${item.key}`"
                  @click="toggleGroup(item.key)"
                >
                  <span>{{ item.label }}</span>
                  <svg
                    class="shrink-0 transition-transform"
                    :class="{ 'rotate-180': isGroupExpanded(item.key) }"
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.75"
                    />
                  </svg>
                </button>

                <ul
                  v-show="isGroupExpanded(item.key)"
                  :id="`mobile-subnav-${item.key}`"
                  class="m-0 list-none pt-1 pr-2 pb-3"
                >
                  <li>
                    <NuxtLink
                      class="mobile-navigation__sublink flex min-h-control w-full items-center rounded-control px-3 py-2 text-control text-ink no-underline [overflow-wrap:anywhere] hover:bg-surface-subtle hover:text-brand-hover hover:underline hover:underline-offset-[0.2em]"
                      :class="isCurrentPage(item.to) ? 'bg-surface-subtle font-bold text-brand underline underline-offset-[0.2em]' : undefined"
                      :to="item.to"
                      :aria-current="isCurrentPage(item.to) ? 'page' : undefined"
                      @click="handleLinkClick"
                    >
                      Обзор раздела
                    </NuxtLink>
                  </li>
                  <li
                    v-for="child in item.children"
                    :key="child.to"
                  >
                    <NuxtLink
                      class="mobile-navigation__sublink flex min-h-control w-full items-center rounded-control px-3 py-2 text-control text-ink no-underline [overflow-wrap:anywhere] hover:bg-surface-subtle hover:text-brand-hover hover:underline hover:underline-offset-[0.2em]"
                      :class="isCurrentPage(child.to) ? 'bg-surface-subtle font-bold text-brand underline underline-offset-[0.2em]' : undefined"
                      :to="child.to"
                      :aria-current="isCurrentPage(child.to) ? 'page' : undefined"
                      @click="handleLinkClick"
                    >
                      {{ child.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </template>

              <NuxtLink
                v-else
                class="mobile-navigation__link flex min-h-control w-full items-center justify-between gap-4 rounded-control px-2 py-3 text-left text-control font-bold text-ink no-underline [overflow-wrap:anywhere] hover:bg-surface-accent hover:text-brand-hover"
                :class="isCurrentSection(item.to) ? 'bg-surface-accent text-brand' : undefined"
                :to="item.to"
                :aria-current="isCurrentPage(item.to) ? 'page' : undefined"
                @click="handleLinkClick"
              >
                <span>{{ item.label }}</span>
                <svg
                  class="shrink-0"
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="m7.5 5 5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                </svg>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  </dialog>
</template>

<style scoped>
.mobile-navigation__dialog[open] {
  display: flex;
}

.mobile-navigation__dialog::backdrop {
  background: rgb(23 40 59 / 24%);
}
</style>

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from '#imports'
import { NAVIGATION_ITEMS } from '~/constants/navigation'

export function useAppNavigation() {
  const route = useRoute()
  const navigationRoot = ref<HTMLElement | null>(null)
  const openDropdown = ref<string | null>(null)

  const currentPath = computed(() => route.path.replace(/\/$/, '') || '/')

  function isCurrentPage(path: string) {
    return currentPath.value === path
  }

  function isCurrentSection(path: string) {
    return currentPath.value === path || currentPath.value.startsWith(`${path}/`)
  }

  function toggleDropdown(key: string) {
    openDropdown.value = openDropdown.value === key ? null : key
  }

  function closeDropdown() {
    openDropdown.value = null
  }

  async function handleEscape(event: KeyboardEvent, key: string) {
    if (openDropdown.value !== key) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    closeDropdown()
    await nextTick()
    navigationRoot.value
      ?.querySelector<HTMLButtonElement>(`[data-dropdown-trigger="${key}"]`)
      ?.focus()
  }

  function handleFocusOut(event: FocusEvent, key: string) {
    if (openDropdown.value !== key) {
      return
    }

    const group = event.currentTarget
    const nextTarget = event.relatedTarget

    if (
      !(group instanceof HTMLElement)
      || !(nextTarget instanceof Node)
      || !group.contains(nextTarget)
    ) {
      closeDropdown()
    }
  }

  function handleDocumentPointerDown(event: PointerEvent) {
    const target = event.target

    if (
      openDropdown.value
      && target instanceof Node
      && !navigationRoot.value?.contains(target)
    ) {
      closeDropdown()
    }
  }

  watch(currentPath, closeDropdown)

  onMounted(() => {
    document.addEventListener('pointerdown', handleDocumentPointerDown, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', handleDocumentPointerDown, true)
  })

  return {
    closeDropdown,
    handleEscape,
    handleFocusOut,
    isCurrentPage,
    isCurrentSection,
    navigationItems: NAVIGATION_ITEMS,
    navigationRoot,
    openDropdown,
    toggleDropdown,
  }
}

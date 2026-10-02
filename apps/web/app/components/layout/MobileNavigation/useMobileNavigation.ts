import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from '#imports'
import { NAVIGATION_ITEMS } from '~/constants/navigation'

const DESKTOP_MEDIA_QUERY = '(min-width: 75rem)'

export function useMobileNavigation() {
  const route = useRoute()
  const closeButton = ref<HTMLButtonElement | null>(null)
  const dialog = ref<HTMLDialogElement | null>(null)
  const menuButton = ref<HTMLButtonElement | null>(null)
  const expandedGroups = ref<string[]>([])
  const currentPath = computed(() => route.path.replace(/\/$/, '') || '/')

  let desktopMediaQuery: MediaQueryList | null = null
  let restoreFocusTarget: 'desktop' | 'menu' | null = null
  let scrollIsLocked = false
  let previousBodyOverflow = ''
  let previousHtmlOverflow = ''

  function isCurrentPage(path: string) {
    return currentPath.value === path
  }

  function isCurrentSection(path: string) {
    return currentPath.value === path || currentPath.value.startsWith(`${path}/`)
  }

  function isGroupExpanded(key: string) {
    return expandedGroups.value.includes(key)
  }

  function toggleGroup(key: string) {
    expandedGroups.value = isGroupExpanded(key)
      ? expandedGroups.value.filter(groupKey => groupKey !== key)
      : [...expandedGroups.value, key]
  }

  function resetExpandedGroups() {
    expandedGroups.value = NAVIGATION_ITEMS
      .filter(item => item.children.length && isCurrentSection(item.to))
      .map(item => item.key)
  }

  function lockPageScroll() {
    if (scrollIsLocked) {
      return
    }

    previousBodyOverflow = document.body.style.overflow
    previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    scrollIsLocked = true
  }

  function unlockPageScroll() {
    if (!scrollIsLocked) {
      return
    }

    document.body.style.overflow = previousBodyOverflow
    document.documentElement.style.overflow = previousHtmlOverflow
    scrollIsLocked = false
  }

  async function openMenu() {
    if (!dialog.value || dialog.value.open) {
      return
    }

    resetExpandedGroups()
    restoreFocusTarget = null
    dialog.value.showModal()
    lockPageScroll()
    await nextTick()
    closeButton.value?.focus()
  }

  function closeMenu(target: 'desktop' | 'menu' | null = 'menu') {
    restoreFocusTarget = target

    if (dialog.value?.open) {
      dialog.value.close()
      return
    }

    unlockPageScroll()
  }

  async function handleDialogClose() {
    unlockPageScroll()
    const focusTarget = restoreFocusTarget
    restoreFocusTarget = null

    await nextTick()

    if (focusTarget === 'menu') {
      menuButton.value?.focus()
    }

    if (focusTarget === 'desktop') {
      const desktopTarget = document.querySelector<HTMLElement>(
        '.desktop-navigation [aria-current="page"], .desktop-navigation .site-navigation__link--active, .site-header .brand-logo',
      )
      desktopTarget?.focus()
    }
  }

  function handleCancel(event: Event) {
    event.preventDefault()
    closeMenu('menu')
  }

  function handleLinkClick() {
    closeMenu(null)
  }

  function getFocusableElements() {
    if (!dialog.value) {
      return []
    }

    return Array.from(
      dialog.value.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(element => element.getClientRects().length > 0)
  }

  function handleDialogKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = getFocusableElements()
    const firstElement = focusableElements[0]
    const lastElement = focusableElements.at(-1)

    if (!firstElement || !lastElement) {
      event.preventDefault()
      closeButton.value?.focus()
      return
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }
    else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  function handleDesktopChange(event: MediaQueryListEvent) {
    if (event.matches && dialog.value?.open) {
      closeMenu('desktop')
    }
  }

  watch(currentPath, () => {
    if (dialog.value?.open) {
      closeMenu(null)
    }
  })

  onMounted(() => {
    desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
    desktopMediaQuery.addEventListener('change', handleDesktopChange)
  })

  onBeforeUnmount(() => {
    desktopMediaQuery?.removeEventListener('change', handleDesktopChange)
    restoreFocusTarget = null

    if (dialog.value?.open) {
      dialog.value.close()
    }

    unlockPageScroll()
  })

  return {
    closeButton,
    closeMenu,
    dialog,
    expandedGroups,
    handleCancel,
    handleDialogClose,
    handleDialogKeydown,
    handleLinkClick,
    isCurrentPage,
    isCurrentSection,
    isGroupExpanded,
    menuButton,
    navigationItems: NAVIGATION_ITEMS,
    openMenu,
    toggleGroup,
  }
}

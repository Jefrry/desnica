import { nextTick, onBeforeUnmount, onMounted, useId } from 'vue'

export interface ArticleTocItem {
  id: string
  label: string
}

interface ArticleTocStateProps {
  readonly items: readonly ArticleTocItem[]
}

export function useArticleToc(props: ArticleTocStateProps) {
  const titleId = `${useId().replaceAll(':', '')}-title`

  function decodeHash() {
    try {
      return decodeURIComponent(window.location.hash.slice(1))
    }
    catch {
      return window.location.hash.slice(1)
    }
  }

  function isTocTarget(id: string) {
    return props.items.some(item => item.id === id)
  }

  function focusHeading(id: string) {
    if (!isTocTarget(id)) {
      return
    }

    const target = document.getElementById(id)

    if (!(target instanceof HTMLHeadingElement) || target.tagName !== 'H2') {
      return
    }

    target.tabIndex = -1
    target.focus({ preventScroll: true })
  }

  function focusCurrentHash() {
    const id = decodeHash()

    if (id) {
      focusHeading(id)
    }
  }

  function handleLinkClick(id: string) {
    window.requestAnimationFrame(() => focusHeading(id))
  }

  onMounted(async () => {
    window.addEventListener('hashchange', focusCurrentHash)
    await nextTick()
    window.requestAnimationFrame(focusCurrentHash)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('hashchange', focusCurrentHash)
  })

  return {
    handleLinkClick,
    titleId,
  }
}

import { ref, useId, watch } from 'vue'

export interface FaqAnswerPart {
  text: string
  to?: string
  href?: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string | FaqAnswerPart[]
}

interface FaqAccordionStateProps {
  readonly items: readonly FaqItem[]
  readonly initialOpenId: string
}

export function useFaqAccordion(props: FaqAccordionStateProps) {
  const instanceId = useId().replaceAll(':', '')
  const openId = ref(getInitialOpenId())

  function getInitialOpenId() {
    return props.items.some(item => item.id === props.initialOpenId)
      ? props.initialOpenId
      : ''
  }

  function questionId(itemId: string) {
    return `${instanceId}-${itemId}-question`
  }

  function answerId(itemId: string) {
    return `${instanceId}-${itemId}-answer`
  }

  function toggle(itemId: string) {
    openId.value = openId.value === itemId ? '' : itemId
  }

  watch(
    () => props.initialOpenId,
    () => {
      openId.value = getInitialOpenId()
    },
  )

  watch(
    () => props.items,
    (items) => {
      if (openId.value && !items.some(item => item.id === openId.value)) {
        openId.value = ''
      }
    },
  )

  return {
    answerId,
    openId,
    questionId,
    toggle,
  }
}

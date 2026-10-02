import { computed, nextTick, onMounted, ref, watch } from 'vue'

export function useFigureMedia(props) {
  const loadFailed = ref(false)
  const imageElement = ref(null)

  function verifyImage() {
    if (imageElement.value?.complete && imageElement.value.naturalWidth === 0) {
      loadFailed.value = true
    }
  }

  function handleImageError() {
    loadFailed.value = true
  }

  watch(
    () => props.src,
    async () => {
      loadFailed.value = false
      await nextTick()
      verifyImage()
    },
  )

  onMounted(verifyImage)

  const aspectRatio = computed(() => {
    if (typeof props.ratio === 'number' && props.ratio > 0) {
      return String(props.ratio)
    }

    if (typeof props.ratio === 'string' && props.ratio.trim()) {
      return props.ratio.replace(':', '/')
    }

    return `${props.width} / ${props.height}`
  })

  const hasImage = computed(() => Boolean(props.src) && !loadFailed.value)
  const missingAccessibleLabel = computed(() => (
    props.alt
      ? `${props.missingLabel}. ${props.alt}`
      : `${props.missingLabel}. Идентификатор материала: ${props.assetId}`
  ))

  return {
    aspectRatio,
    handleImageError,
    hasImage,
    imageElement,
    missingAccessibleLabel,
  }
}

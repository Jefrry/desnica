import { computed } from 'vue'
import { useRuntimeConfig } from '#imports'

function isEnabledFlag(value: unknown) {
  if (typeof value === 'boolean') {
    return value
  }

  return typeof value === 'string'
    && ['1', 'true'].includes(value.trim().toLowerCase())
}

export function useDeploymentPreview() {
  const config = useRuntimeConfig()

  return computed(() => isEnabledFlag(config.public.previewMode))
}

import type { ComputedRef } from 'vue'
import { useHead } from '#imports'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'

export function useDeploymentPreviewMetadata(
  isPreviewMode: ComputedRef<boolean> = useDeploymentPreview(),
) {
  useHead(() => ({
    meta: isPreviewMode.value
      ? [{ name: 'robots', content: 'noindex, nofollow' }]
      : [],
  }))
}

import { useRuntimeConfig } from '#imports'

// It needs for api and image urls
export function getCmsBaseUrl() {
  const config = useRuntimeConfig()
  return import.meta.server ? config.strapiUrl : config.public.strapiUrl
}

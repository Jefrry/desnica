import type { ServiceRoute } from '~/constants/navigation'

export interface ServiceDefinition {
  id: 'local-documents' | 'odi' | 'project-review' | 'accessibility-passport'
  title: string
  description: string
  lead: string
  to: ServiceRoute
  assetId: string
  alt: string
}

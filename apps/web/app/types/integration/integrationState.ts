import type { DEMONSTRATION_CONTENT_LABEL } from '~/types/content/contentSource'

export type IntegrationState =
  | {
    mode: 'unavailable'
    state: 'unavailable'
    message: string
  }
  | {
    mode: 'live'
    state: 'idle' | 'pending' | 'error' | 'success'
    message?: string
  }
  | {
    mode: 'demonstration'
    transport: 'local-only'
    state: 'idle' | 'pending' | 'error' | 'simulated-success'
    label: typeof DEMONSTRATION_CONTENT_LABEL
    message?: string
  }

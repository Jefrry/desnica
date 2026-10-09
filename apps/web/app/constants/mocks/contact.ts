import { DEMONSTRATION_CONTENT_SOURCE } from '~/types/content/contentSource'
import type { ContactContent } from '~/types/contact/contact'
import { UNCONFIRMED_CONTACT_CHANNELS } from '~/constants/contact'

export const previewContactContent: ContactContent = {
  availability: 'available',
  source: DEMONSTRATION_CONTENT_SOURCE,
  data: {
    channels: UNCONFIRMED_CONTACT_CHANNELS,
  },
}

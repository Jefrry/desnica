<script setup lang="ts">
import { computed } from 'vue'
import type { ContactContent } from '~/types/contact/contact'
import { UNCONFIRMED_CONTACT_CHANNELS } from '~/constants/contact'

defineOptions({ name: 'ContactDetails' })

interface Props {
  content: ContactContent
}

const props = defineProps<Props>()

const channels = computed(() => props.content.availability === 'available'
  ? props.content.data.channels
  : UNCONFIRMED_CONTACT_CHANNELS)
</script>

<template>
  <section
    class="rounded-card border border-border-subtle bg-surface p-5 tablet:p-6"
    aria-labelledby="contact-details-title"
  >
    <h2
      id="contact-details-title"
      class="mb-5"
    >
      Наши контакты
    </h2>

    <address class="not-italic">
      <dl class="m-0 grid gap-0">
        <div
          v-for="channel in channels"
          :key="channel.kind"
          class="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-b border-border-subtle py-4 first:pt-0 last:border-b-0 last:pb-0"
        >
          <svg
            class="mt-0.5 size-6 text-brand"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="8"
              stroke="currentColor"
              stroke-width="1.75"
            />
            <path
              d="M8.5 12h7M12 8.5v7"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
            />
          </svg>
          <div class="min-w-0">
            <dt class="font-semibold text-ink">
              {{ channel.label }}
            </dt>
            <dd class="m-0 text-caption text-muted">
              <a
                v-if="channel.href"
                :href="channel.href"
              >{{ channel.value }}</a>
              <span v-else>{{ channel.value }}</span>
            </dd>
          </div>
        </div>
      </dl>
    </address>

    <p
      v-if="content.availability === 'unavailable'"
      class="mt-5 mb-0 text-caption text-muted"
    >
      {{ content.message }}
    </p>
  </section>
</template>

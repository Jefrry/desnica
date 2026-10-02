<script setup>
import { computed } from 'vue'

defineOptions({ name: 'ContactBand' })

const props = defineProps({
  id: {
    type: String,
    default: 'contact-band',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  ctaLabel: {
    type: String,
    default: 'Связаться с нами',
  },
  ctaTo: {
    type: [String, Object],
    default: '/contacts',
  },
  phone: {
    type: Object,
    default: undefined,
  },
  email: {
    type: Object,
    default: undefined,
  },
})

const headingId = computed(() => `${props.id}-title`)
const hasContacts = computed(() => Boolean(props.phone || props.email))
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="headingId"
    class="bg-surface-accent"
  >
    <Container
      class="grid items-center gap-6 py-6 tablet:py-8"
      :class="hasContacts
        ? 'tablet:grid-cols-[minmax(0,1fr)_auto] desktop:grid-cols-[minmax(0,1fr)_auto_minmax(14rem,0.7fr)]'
        : 'tablet:grid-cols-[minmax(0,1fr)_auto]'"
    >
      <div class="min-w-0">
        <h2
          :id="headingId"
          class="mb-2 text-h3-mobile tablet:text-h3"
        >
          {{ title }}
        </h2>
        <p class="m-0 max-w-[42rem] text-caption text-muted">
          {{ text }}
        </p>
      </div>

      <ActionLink :to="ctaTo">
        {{ ctaLabel }}
      </ActionLink>

      <address
        v-if="hasContacts"
        class="not-italic text-caption text-muted tablet:col-span-2 desktop:col-span-1"
      >
        <p
          v-if="phone"
          class="mb-2 flex items-start gap-2"
        >
          <svg
            class="mt-0.5 size-5 shrink-0"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.7 2.5H4.2c-.9 0-1.7.8-1.6 1.7.5 7 6.2 12.7 13.2 13.2.9.1 1.7-.7 1.7-1.6v-2.5l-3.4-1.1-1.1 2a12.5 12.5 0 0 1-7.2-7.2l2-1.1-1.1-3.4Z"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>
            <span class="font-semibold text-ink">Телефон — </span>
            <a
              v-if="phone.href"
              :href="phone.href"
            >{{ phone.value }}</a>
            <span v-else>{{ phone.value }}</span>
          </span>
        </p>

        <p
          v-if="email"
          class="m-0 flex items-start gap-2"
        >
          <svg
            class="mt-0.5 size-5 shrink-0"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2.5"
              y="4"
              width="15"
              height="12"
              rx="2"
              stroke="currentColor"
              stroke-width="1.6"
            />
            <path
              d="m3.5 5 6.5 5 6.5-5"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>
            <span class="font-semibold text-ink">Эл. почта — </span>
            <a
              v-if="email.href"
              :href="email.href"
            >{{ email.value }}</a>
            <span v-else>{{ email.value }}</span>
          </span>
        </p>
      </address>
    </Container>
  </section>
</template>

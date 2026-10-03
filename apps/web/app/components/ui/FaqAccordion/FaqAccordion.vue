<script setup lang="ts">
import type { FaqItem } from './useFaqAccordion'
import { useFaqAccordion } from './useFaqAccordion'

defineOptions({ name: 'FaqAccordion' })

interface Props {
  items: FaqItem[]
  initialOpenId?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialOpenId: '',
})

const {
  answerId,
  openId,
  questionId,
  toggle,
} = useFaqAccordion(props)
</script>

<template>
  <div class="overflow-hidden rounded-card border border-border-subtle bg-surface">
    <section
      v-for="(item, itemIndex) in items"
      :key="item.id"
      :class="itemIndex > 0 ? 'border-t border-border-subtle' : undefined"
    >
      <h3 class="m-0 text-control leading-normal">
        <button
          :id="questionId(item.id)"
          type="button"
          class="flex min-h-control w-full cursor-pointer items-center justify-between gap-4 border-0 bg-surface px-4 py-3 text-left font-bold text-ink hover:bg-surface-accent"
          :aria-expanded="openId === item.id"
          :aria-controls="answerId(item.id)"
          @click="toggle(item.id)"
        >
          <span class="min-w-0 [overflow-wrap:anywhere]">{{ item.question }}</span>
          <svg
            class="size-5 shrink-0 text-brand transition-transform"
            :class="openId === item.id ? 'rotate-180' : undefined"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m5 8 5 5 5-5"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </h3>

      <div
        v-show="openId === item.id"
        :id="answerId(item.id)"
        class="bg-surface-accent px-4 py-4 text-caption text-muted"
        role="region"
        :aria-labelledby="questionId(item.id)"
      >
        <p
          v-if="typeof item.answer === 'string'"
          class="m-0"
        >
          {{ item.answer }}
        </p>

        <p
          v-else
          class="m-0"
        >
          <template
            v-for="(part, partIndex) in item.answer"
            :key="`${item.id}-${partIndex}`"
          >
            <NuxtLink
              v-if="part.to"
              :to="part.to"
            >
              {{ part.text }}
            </NuxtLink>
            <a
              v-else-if="part.href"
              :href="part.href"
            >{{ part.text }}</a>
            <span v-else>{{ part.text }}</span>{{ partIndex < item.answer.length - 1 ? ' ' : '' }}
          </template>
        </p>
      </div>
    </section>
  </div>
</template>

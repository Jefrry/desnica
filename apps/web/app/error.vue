<script setup lang="ts">
import { clearError, useSeoMeta } from '#imports'
import type { NuxtError } from '#app'
import { ERROR_CONTEXT, ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'

defineOptions({ name: 'AppErrorPage' })

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()

const isNotFound = props.error.status === ERROR_STATUS.NOT_FOUND
const errorContext = typeof props.error.data === 'object' && props.error.data !== null
  ? (props.error.data as { context?: unknown }).context
  : undefined
const isPublicationError = errorContext === ERROR_CONTEXT.PUBLICATION
const isMissingPublication = isNotFound && isPublicationError
const errorTitle = isNotFound ? ERROR_MESSAGES.PAGE_NOT_FOUND : ERROR_MESSAGES.PAGE_LOAD_FAILED
const errorDescription = isMissingPublication
  ? ERROR_MESSAGES.MISSING_NEWS_DESCRIPTION
  : isPublicationError
    ? ERROR_MESSAGES.NEWS_SERVICE_FAILED
    : isNotFound
      ? ERROR_MESSAGES.MISSING_PAGE_DESCRIPTION
      : ERROR_MESSAGES.PAGE_LOAD_FAILED_DESCRIPTION
const returnPath = isPublicationError ? '/news' : '/'
const returnLabel = isPublicationError ? 'Вернуться к новостям' : 'Вернуться на главную'

useSeoMeta({
  title: errorTitle,
  description: errorDescription,
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      class="fixed top-3 left-3 z-[100] -translate-y-[200%] rounded-control bg-ink px-4 py-3 text-control font-semibold text-surface no-underline focus:translate-y-0 focus:text-surface"
      href="#main-content"
    >
      Перейти к содержимому
    </a>

    <AppHeader />

    <AppMain>
      <section
        class="page-section"
        aria-labelledby="error-title"
      >
        <h1 id="error-title">
          {{ errorTitle }}
        </h1>
        <p>
          {{ errorDescription }}
        </p>
        <ActionButton
          @click="clearError({ redirect: returnPath })"
        >
          {{ returnLabel }}
        </ActionButton>
      </section>
    </AppMain>

    <AppFooter />
  </div>
</template>

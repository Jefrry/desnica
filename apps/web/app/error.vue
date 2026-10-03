<script setup lang="ts">
import { clearError } from '#imports'
import type { NuxtError } from '#app'
import { useDeploymentPreview } from '~/composables/useDeploymentPreview'
import { useDeploymentPreviewMetadata } from '~/composables/useDeploymentPreviewMetadata'
import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'

defineOptions({ name: 'AppErrorPage' })

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()
const isPreviewMode = useDeploymentPreview()

useDeploymentPreviewMetadata(isPreviewMode)

const isNotFound = props.error.status === ERROR_STATUS.NOT_FOUND
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <PreviewBanner v-if="isPreviewMode" />

    <main class="flex-1 py-10 tablet:py-16">
      <section
        class="page-section"
        aria-labelledby="error-title"
      >
        <h1 id="error-title">
          {{ isNotFound ? ERROR_MESSAGES.PAGE_NOT_FOUND : ERROR_MESSAGES.PAGE_LOAD_FAILED }}
        </h1>
        <p>
          {{ isNotFound
            ? ERROR_MESSAGES.MISSING_NEWS_DESCRIPTION
            : ERROR_MESSAGES.NEWS_SERVICE_FAILED }}
        </p>
        <button
          type="button"
          @click="clearError({ redirect: '/news' })"
        >
          Вернуться к новостям
        </button>
      </section>
    </main>
  </div>
</template>

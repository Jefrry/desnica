<script setup lang="ts">
import { clearError } from '#imports'
import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants'

defineOptions({ name: 'AppErrorPage' })

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
})

const isNotFound = props.error.status === ERROR_STATUS.NOT_FOUND
</script>

<template>
  <main>
    <section aria-labelledby="error-title">
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
</template>

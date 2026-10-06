<script setup lang="ts">
defineOptions({ name: 'PublicationCollectionState' })

interface Props {
  state: 'pending' | 'empty' | 'error' | 'missing-page'
  retrying?: boolean
}

withDefaults(defineProps<Props>(), {
  retrying: false,
})

defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="min-h-64 py-8">
    <p
      v-if="state === 'pending'"
      role="status"
      aria-live="polite"
      class="text-muted"
    >
      Загружаем материалы…
    </p>

    <p
      v-else-if="state === 'empty'"
      class="text-muted"
    >
      Публикаций пока нет.
    </p>

    <InlineNotice
      v-else-if="state === 'error'"
      kind="error"
      text="Не удалось загрузить новости. Попробуйте ещё раз."
    >
      <template #action>
        <ActionButton
          variant="secondary"
          :loading="retrying"
          loading-label="Повторная загрузка"
          @click="$emit('retry')"
        >
          Попробовать снова
        </ActionButton>
      </template>
    </InlineNotice>

    <InlineNotice
      v-else
      kind="info"
      text="Такой страницы архива нет. Выберите существующую страницу публикаций."
    />
  </div>
</template>

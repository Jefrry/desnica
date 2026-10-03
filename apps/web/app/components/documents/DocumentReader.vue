<script setup lang="ts">
import type { ContentResource } from '~/types/content/contentSource'
import type { DocumentText } from '~/types/document/document'

defineOptions({ name: 'DocumentReader' })

interface Props {
  id?: string
  title?: string
  textVersion?: ContentResource<DocumentText>
  headingId?: string
  documentHeadingId?: string
  missingMessage?: string
}

withDefaults(defineProps<Props>(), {
  id: 'document-reader',
  title: undefined,
  textVersion: undefined,
  headingId: 'document-reader-heading',
  documentHeadingId: 'document-reader-document-heading',
  missingMessage: 'Выбранный документ не найден.',
})
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="headingId"
    class="min-w-0 scroll-mt-28"
  >
    <h2
      :id="headingId"
      class="scroll-mt-28 focus:outline-none"
      tabindex="-1"
    >
      Текст документа
    </h2>

    <template v-if="title && textVersion">
      <h3
        :id="documentHeadingId"
        class="focus:outline-none"
        tabindex="-1"
      >
        {{ title }}
      </h3>

      <InlineNotice
        v-if="textVersion.availability === 'available' && textVersion.source.kind === 'demonstration'"
        class="mb-6"
        kind="info"
        :text="textVersion.source.disclaimer"
      />

      <div
        v-if="textVersion.availability === 'available'"
        class="max-w-[46rem]"
      >
        <section
          v-for="section in textVersion.data.sections"
          :id="section.id"
          :key="section.id"
          class="mb-6 last:mb-0"
          :aria-labelledby="section.title ? `${section.id}-heading` : undefined"
        >
          <h3
            v-if="section.title"
            :id="`${section.id}-heading`"
          >
            {{ section.title }}
          </h3>
          <p
            v-for="paragraph in section.paragraphs"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
        </section>
      </div>
    </template>

    <InlineNotice
      v-else
      kind="error"
      :text="missingMessage"
    />
  </section>
</template>

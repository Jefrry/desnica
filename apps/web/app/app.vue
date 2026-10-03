<script setup lang="ts">
import { useDeploymentPreviewMetadata } from '~/composables/useDeploymentPreviewMetadata'

useDeploymentPreviewMetadata()
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

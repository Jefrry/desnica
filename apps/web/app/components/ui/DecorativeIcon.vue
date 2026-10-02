<script setup>
defineOptions({ name: 'DecorativeIcon' })

const iconPaths = {
  building: [
    'M4 21h16M6 21V7l6-4 6 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-3h4v3',
  ],
  check: ['m5 12 4 4L19 6'],
  document: ['M7 3h7l4 4v14H7z', 'M14 3v5h5M10 12h5M10 16h5'],
  education: ['m3 10 9-5 9 5-9 5z', 'M7 13v4c3 2 7 2 10 0v-4M21 10v6'],
  layers: ['m4 8 8-4 8 4-8 4z', 'm4 12 8 4 8-4M4 16l8 4 8-4'],
  people: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'],
  search: ['M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16', 'm21 21-4.35-4.35'],
  settings: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06L7.04 4.3l.06.06A1.65 1.65 0 0 0 8.92 4a1.65 1.65 0 0 0 1-1.51V2h4v.49A1.65 1.65 0 0 0 14.92 4a1.65 1.65 0 0 0 1.82.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21v4h-.09a1.65 1.65 0 0 0-1.51 1Z'],
  target: ['M12 22a10 10 0 1 0-10-10', 'M12 18a6 6 0 1 0-6-6', 'M12 14a2 2 0 1 0-2-2M22 2l-6 6M16 2h6v6'],
}

defineProps({
  name: {
    type: String,
    default: 'check',
    validator: value => [
      'building',
      'check',
      'document',
      'education',
      'layers',
      'people',
      'search',
      'settings',
      'target',
    ].includes(value),
  },
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="path in iconPaths[name]"
      :key="path"
      :d="path"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

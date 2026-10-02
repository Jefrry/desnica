<template>
  <NuxtLink
    class="brand-logo inline-flex shrink-0 items-center gap-3 rounded-control text-ink no-underline hover:text-brand-hover hover:no-underline"
    to="/"
    aria-label="Ресурсный центр — на главную"
  >
    <span
      class="relative block h-14 w-12 shrink-0 overflow-hidden bg-surface"
      aria-hidden="true"
    >
      <img
        class="absolute top-[-0.85rem] left-[-0.785rem] h-auto w-[12.332rem] max-w-none"
        src="/images/resource-center-logo-color.jpg"
        alt=""
        width="1885"
        height="791"
        loading="eager"
        fetchpriority="high"
      >
    </span>

    <span class="flex flex-col text-brand-mobile font-bold tablet:text-brand-tablet desktop:text-brand-desktop">
      <span>Ресурсный</span>
      <span>центр</span>
    </span>
  </NuxtLink>
</template>

<template>
  <div>
    <nav class="flex justify-center gap-3 py-4 uppercase font-semibold tracking-widest">
      <NuxtLink to="/" class="px-5 w-32">
        <div class="flex justify-start">
          <img src="~/assets/images/logo.svg" alt="logo" class="w-8">
        </div>
      </NuxtLink>
      <h1 class="text-center py-2 text-4xl font-black-ops-one flex-1">Times Tables Champ</h1>
      <NuxtLink to="/scoreboard" class="w-32 text-sm block text-center">Scoreboard</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ''},
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" }
  ]
})
</script>
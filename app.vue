<template>
  <div>
    <nav class="flex justify-center gap-3 py-4 uppercase font-bold">
      <NuxtLink to="/" class="px-5 w-48" @click="reload">
        <div class="flex justify-start">
          <img src="~/assets/images/logo-b.svg" alt="logo" class="w-10">
        </div>
      </NuxtLink>
      <h1 class="text-center py-2 text-4xl font-black-ops-one flex-1 tracking-widest">Times Tables Champ</h1>
      <div class="w-48 flex gap-5 text-sm text-sky-950 tracking-wider">
        <NuxtLink to="/scoreboard">Scoreboard</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </div>
      
    </nav>
    <NuxtPage />
    <footer class="text-xs uppercase opacity-30 fixed bottom-0 right-0 p-2">rev: 13 Dec 2023</footer>
  </div>
</template>

<script setup>
const route = useRoute()

useHead({
  title: 'Times Tables Champ | A game to practice multiplication tables',
  link: [
    { rel: "apple-touch-icon", sizes: "180x180", href: "/resources/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/resources/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/resources/favicon-16x16.png" },
    { rel: "manifest", href: "/resources/site.webmanifest" },
    { rel: "mask-icon", href: "/resources/safari-pinned-tab.svg", color: "#5bbad5" },
    { rel: "shortcut icon", href: "/resources/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ''},
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" }
  ]
})

const reload = () => {
  if (route.name !== 'index' ) {
    return
  }
  if (process.client) {
    reloadNuxtApp()
  }
}
</script>

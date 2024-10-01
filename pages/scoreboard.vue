<template>
  <div class=" md:w-3/5 m-auto mt-4">
    <ClientOnly>
    <svg class="w-12 md:w-28 m-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 464h160"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 464V336"></path><path d="M384 224c0-50.64-.08-134.63-.12-160a16 16 0 0 0-16-16l-223.79.26a16 16 0 0 0-16 15.95c0 30.58-.13 129.17-.13 159.79c0 64.28 83 112 128 112S384 288.28 384 224z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M128 96H48v16c0 55.22 33.55 112 80 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path d="M384 96h80v16c0 55.22-33.55 112-80 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg>
    <h1 class="font-black-ops-one text-center tracking-widest text-lg md:text-2xl uppercase">Leaderboard</h1>
    
    <section v-if="pending" class="font-black-ops-one text-center md:text-xl py-20 uppercase flex flex-col justify-center">
      <div class="pb-2 tracking-widest">... Loading scores ...</div>
      <div class="loader m-auto"></div>
    </section>
    
    <section v-else class="font-black-ops-one">
      <div v-for="(record, index) in board.scores" class="flex h-12 md:h-[110px] gap-3 px-3 border m-3 rounded-lg border-gray-300 shadow-lg items-center">
        <div class="md:text-3xl">{{ index + 1 }}.</div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 md:w-8" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
        <div class="uppercase tracking-wider md:text-3xl flex-1">{{ record.player }}</div>
        <div v-if="hasBadge(record)" class="flex">
          <div v-for="badge in record.badges" class="flex">
            <img :src="badgeLink(badge)" alt="badge" class="w-12 md:w-[100px]">
          </div>
        </div>
        <div class="w-14 md:w-32 md:text-3xl text-right align-middle">{{ record.score }}</div>
      </div>
    </section>
    
    <footer class="flex justify-center py-6">
      <TouchButton @click="onBack()">Back</TouchButton>
    </footer>
    </ClientOnly>
  </div>
</template>

<script setup>
import { URL } from '../helpers/leaderboard'

const { data: board, pending } = await useFetch(`${URL}?v=${new Date().valueOf() }`)

const hasBadge = (record) => {
  if (record && record.badges && record.badges.length) {
    return true
  }
  return false
}
const badgeLink = (badge) => {
  return `/resources/badges/${badge}.webp`
}

const onBack = () => {
  navigateTo('/')
}
</script>
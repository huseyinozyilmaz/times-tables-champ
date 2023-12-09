<template>
  <div class="border-2 border-gray-900 w-3/5 m-auto mt-4 rounded-lg">
    <h1 class="font-black-ops-one text-center tracking-widest text-2xl">Leaderboard</h1>
    <section>
      <div v-for="player in players" class="flex gap-3 h-12 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
        <div>{{ player.name }}</div>
        <div>{{ player.score }}</div>
        <div>{{ player.trophy }}</div>
      </div>
    </section>
  </div>
</template>

<script setup>
const players = [
  { name: 'Ahmed', score: 2000, trophy: 3 },
  { name: 'Alfie', score: 1000, trophy: 2 },
  { name: 'Dylan', score: 1000, trophy: 1 },
  { name: 'Joseph', score: 500, trophy: 1 }
]

</script>
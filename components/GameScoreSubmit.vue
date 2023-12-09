<template>
  <section class="text-center py-6">
    <h2 class="uppercase font-bold tracking-widest py-4">Player</h2>
    <div class="">
      <input type="text" name="player" v-model="player" id="player" placeholder="Enter Player Name" class="border-8 border-yellow-400 p-3 w-64 uppercase text-center">
    </div>
  </section>
</template>

<script setup>
const player = ref('')
</script>
<template>
  <div>
    <header class="uppercase text-center py-3 font-mono flex justify-center border-b">
      <div class="w-24">
        <h3 class="font-bold">Level</h3>
        <div class="flex justify-center">
          <select id="selectedLevel" v-model="selectedLevel" class='select' :disabled="game.status === 'running'">
            <option v-for="level in game.maxLevel " :value="level">{{ level}}</option>
          </select>
        </div>
      </div>
      <div class="w-24">
        <h3 class="font-bold">Time</h3>
        <div class="py-2.5">{{ formatTime(remainingTime) }}</div>
      </div>
      <div class="w-24">
        <h3 class="font-bold">Life</h3>
        <div class="py-2.5">{{ game.life }}</div>
      </div>
      <div class="w-24">
        <h3 class="font-bold">Score</h3>
        <div class="py-2.5">{{ game.score }}</div>
      </div>
    </header>
    <section v-if="game.status === 'running'" class="text-center mt-12">
      <GameQuestion :question="game.questions[0]"/>
      <div class="mt-4">
        <TouchButton @click="onNext()">Next</TouchButton>
      </div>
    </section>
    <section v-else class="text-center">
      <h1 class="font-black-ops-one text-lg py-7 tracking-wider">Are you ready?</h1>
      <TouchButton @click="onStart()">Start the game</TouchButton>
    </section>
  </div>
</template>

<script setup>
import { Game } from '../helpers/game'
import { formatTime } from '../helpers/formatters'

const selectedLevel = ref(3)
const game = ref(new Game(selectedLevel.value))
const timeElapsed = ref(0)
const interval = ref(undefined)

const remainingTime = computed(() => {
  return (100 - timeElapsed.value) / 10
})

const onStart = () => {
  game.value.init()
}
</script>
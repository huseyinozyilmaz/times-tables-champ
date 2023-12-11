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
        <h3 class="font-bold">Questions</h3>
        <div class="py-2.5">{{ game.counts.remaining }}</div>
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
      <GameQuestion :question="game.question" :result="result" @submit="onSubmit"/>
      <div class="mt-4">
        <TouchButton @click="onNext()" type="primary">Next</TouchButton>
      </div>
    </section>
    <section v-else-if="['finished', 'over'].includes(game.status)" class="text-center mt-12">
      <h1 v-if="game.status === 'finished'" class="font-black-ops-one text-2xl">MISSION COMPLETE</h1>
      <h1 v-if="game.status === 'over'" class="font-black-ops-one text-2xl">GAME OVER</h1>
      <h2 class="font-black-ops-one uppercase py-3">score</h2>
      <h3 class="font-black-ops-one text-5xl pb-6">{{ game.score }}</h3>
      <input type="text" v-model="player" class="border-2 uppercase p-3 text-center w-64 block m-auto border-gray-800" placeholder="Enter your name">
      <TouchButtonType @click="onRestart()">Restart</TouchButtonType>
      <TouchButton @click="onScoreSave()">Save</TouchButton>
    </section>
    <section v-else class="text-center">
      <h1 class="font-black-ops-one text-lg py-7 tracking-wider">Are you ready?</h1>
      <TouchButton @click="onStart()">Start the game</TouchButton>
    </section>
    <footer v-if="debug" class="uppercase text-xs text-center py-3">
      Game Status: {{ game.status }} | 
      Life: {{ game.life }} | 
      Counts: {{ game.counts }} |
      Question: {{ game.question }}
    </footer>
  </div>
</template>

<script setup>
import { Game } from '../helpers/game'
import { formatTime } from '../helpers/formatters'

const debug = false
const selectedLevel = ref(3)
const game = ref(new Game(selectedLevel.value))
const player = ref('')
const timeElapsed = ref(0)
const interval = ref(undefined)
const result = ref({})

const remainingTime = computed(() => {
  return (100 - timeElapsed.value) / 10
})

const onStart = () => {
  result.value = {}
  game.value.init()
}

const onNext = () => {
  result.value = {}
  game.value.next()
}

const onSubmit = (questionId, answer, timeElapsed) => {
  result.value = game.value.submit({ questionId, answer, timeElapsed})
}

const onScoreSave = async () => {
  if (player.value) {
    await game.value.save(player.value)
    navigateTo('/scoreboard')
  }
}

const onRestart = () => {
  result.value = {}
  game.value.init()
}
</script>
<template>
  <div>
    <header class="uppercase text-center py-3 font-mono flex justify-center border-b">
      <div class="w-24">
        <h3 class="font-bold">Level</h3>
        <div class="flex justify-center">
          <select id="selectedLevel" v-model="selectedLevel" class='select' :disabled="game.status !== 'ready'">
            <option v-for="level in 12 " :value="level">{{ level}}</option>
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
    <section v-if="game.status === 'ready'" class="text-center mt-12">
      <GameQuestion :question="game.questions[0]"/>
      <div class="mt-4">
        <TouchButton @click="onNext()">Next</TouchButton>
      </div>
    </section>
    <section v-else class="text-center">
      <h1 class="font-black-ops-one text-lg py-7 tracking-wider">Are you ready?</h1>
      <TouchButton @click="onStart()">Start the game</TouchButton>
    </section>
    <footer class="text-center">{{ game.status }}</footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { formatTime } from '../helpers/formatters'
import { Game } from '../helpers/game'

const selectedLevel = ref(3)
const game = ref(new Game(selectedLevel.value))

/** Events */
const onStart = () => {
  game.value.init()
}

let timesTables = []

const timeElapsed = ref(0)
const interval = ref(undefined)
const startClock = () => {
  timeElapsed.value = 0
  interval.value = setInterval(() =>{
    timeElapsed.value++
    if (timeElapsed.value >= 100) {
      // Times Up
      answer(-1)
    }
  }, 100)
}

const pauseClock = () => {
  clearInterval(interval.value)
}

const resetClock = () => {
  timeElapsed.value = 0
  if (interval.value !== undefined) {
    clearInterval(interval.value)
    interval.value = undefined
  }
  startClock()
}

const answer = (choice) => {
  
  // game.value = generate()
  // resetClock()
}

const randomInt = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ]
  }
  return array
}

onMounted(() => {
  timesTables = generateTimesTables()
})


const ask = () => {
  const x = randomInt(1, selectedLevel.value)
  const y = randomInt(1, timesTables.length - 1)
  const multipliers = shuffle([x, y])
  const answer = timesTables[x][y]

  return {
    multipliers,
    answer,
    options: generateOptions(x, y, timesTables)
  }
}



const findNear = (point, min, max) => {
  return randomInt(point-2 > min ? point-2 : min, point + 2 > max ? max : point + 2 ) 
}

const generateTimesTables = () => {
  const matrix = []
  for (let i = 0; i <=12; i++) {
    const row = []
    for (let j = 0; j <=12; j++) {
      row[j] = i * j
    }
    matrix[i] = row
  }
  return matrix
}

const remainingTime = computed(() => {
  return (100 - timeElapsed.value) / 10
})



const onNext = () => {
  game.value = ask()
}

</script>

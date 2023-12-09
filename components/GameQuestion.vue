
<template>
  <div v-if="question">
    <h1 class="text-5xl">
      {{ question.multipliers[0] }} x {{  question.multipliers[1] }} = {{ result.message ? question.answer : '?'}}
    </h1>
    <div class="flex gap-5 justify-center py-10">
      <div v-for="option in question.options" @click="answer(option)" class="border w-24 p-3 text-xl rounded border-gray-800 cursor-pointer active:translate-y-2"
        :class="[{ 'shake' : (result.success && option === result.choice )}, { 'bg-red-700' : (!result.success && option === result.choice )}]">
        {{ option }}
      </div>
    </div>
    <div class="text-center text-red-800 tracking-wider text-lg h-24 font-black-ops-one">
      <p class="text-4xl pb-3">{{ result.emoji }}</p>
      <div :class="{ 'text-green-800' : result.success }">{{ result.message }}</div>
    </div>
  </div>
</template>

<script setup>
import { getSuccessMessage, getFailureMessage } from '../helpers/game'
const props = defineProps(['question'])

const result = ref ({})

const answer = (choice) => {
  if (props.question.answer === choice) {
    result.value = {
      success: true,
      message: getSuccessMessage(),
      emoji: '👍',
      choice: choice
    } 
  } else {
    result.value = {
      success: false,
      message: getFailureMessage(),
      emoji: '👎',
      choice: choice
    }
  }
}

</script>
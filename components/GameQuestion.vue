
<template>
  <div v-if="question">
    <h1 class="text-5xl flex justify-center">
      <div class="w-20">{{ question.multipliers[0] }}</div>
      <div>x</div>
      <div class="w-20">{{ question.multipliers[1] }}</div>
      <div>=</div>
      <div class="w-20">{{ result.status === 'success' ? result.answer : '?'}}</div>
    </h1>
    <div class="flex justify-center py-10">
      <TouchButtonType v-for="option in question.options" @click="submit(option)">
        {{ option }}
      </TouchButtonType>
    </div>
    <div class="text-center text-red-800 tracking-wider text-lg h-12 font-black-ops-one">
      <div :class="{ 'text-green-800' : result.status === 'success' }">{{ result.message }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['question', 'result'])
const emit = defineEmits(['submit'])

const submit = (answer) => {
  const timeElapsed = 200
  emit('submit', answer, timeElapsed)
}

</script>
<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th>Level</th>
          <th>Time</th>
          <th>Life</th>
          <th>Score</th>
        </tr>  
      </thead>
      <tbody>
        <tr>
          <td class="flex justify-center">
            <select id="selectedLevel" v-model="selectedLevel" @change="onChange()" 
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="level in 12 " :value="level">{{ level}}</option>
            </select>
          </td>
          <td>{{ formatTime(time) }}</td>
          <td>{{ life }} </td>
          <td>{{ score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

defineProps(['time', 'life' ,'score'])

const emit = defineEmits(['levelChange'])

const selectedLevel = ref("3")

const onChange = () => {
  emit('levelChange', selectedLevel.value )
}

const formatTime = (value) => {
  if (!value) {
    return '10.00'
  }
  let result  = Number(value).toFixed(2)
  if (value < 10) {
    return '0' + result
  }
  if (value === 0) {
    return '00.00'
  }
  return result
}

</script>
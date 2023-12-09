<template>
  <div class="btn-default" :class="status" @click="onClick()">
    <button type="button">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(['type'])
const status = ref('')

const onClick = () => {
  status.value = props.type
}
</script>

<style>
.error:after {
  background-color: #d41d1d;
}
.success:after {
  background-color: rgb(44, 200, 27);
}
</style>
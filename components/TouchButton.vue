<template>
  <div class="button" :class="styleClass">
    <button type="button">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(['type'])

const styleClass = computed(() => {
  return 'button-' + props.type
})
</script>
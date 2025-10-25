<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'info',
  },
})
</script>

<template>
  <div class="toast" :class="type">{{ message }}</div>
</template>

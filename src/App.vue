<script setup>
import AppToast from './components/AppToast.vue'
import { ref } from 'vue'
const tickets = ref([
  {
    id: 1,
    title: 'Fix login bug',
    status: 'open',
    description: 'Users cannot log in',
    priority: 'high',
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: 'Update docs',
    status: 'in_progress',
    description: 'Need to update API docs',
    priority: 'medium',
    createdAt: Date.now(),
  },
])
</script>

<template>
  <div id="app">
    <AppToast />
    <RouterView :tickets="tickets" />
  </div>
</template>

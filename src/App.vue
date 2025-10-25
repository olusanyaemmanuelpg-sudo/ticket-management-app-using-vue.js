<script setup>
import { useToast } from './composables/toast'
import Toast from './components/Toast.vue'

const { toast } = useToast()
</script>

<template>
  <RouterView />
  <Toast v.if="toast.message" :message="toast.message" :type="toast.type" />
</template>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-sizing: 0 4px;
  animation: slideIn 0.3s ease;
  z-index: 9999;
}
.toast.info {
  background: #3b82f6;
}
.toast.success {
  background: #10b981;
}
.toast.error {
  background: #ef4444;
}
</style>

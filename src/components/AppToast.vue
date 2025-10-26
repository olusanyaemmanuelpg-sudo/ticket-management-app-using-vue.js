<script setup>
import { useToast } from '@/composables/Toast'
const { toast } = useToast()
</script>

<template>
  <Transition name="slide">
    <div v-if="toast.visible" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  font-weight: 500;
  max-width: 400px;
}
.toast.toast-info {
  background: #3b82f6;
}
.toast.toast-success {
  background: #10b981;
}
.toast.toast-error {
  background: #ef4444;
}
.slide-enter-active {
  animation: slideIn 0.3s ease;
}
.slide-leave-active {
  animation: slideOut 0.3s ease;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>

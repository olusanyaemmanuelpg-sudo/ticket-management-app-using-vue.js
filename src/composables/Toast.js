import { reactive } from 'vue'

const toast = reactive({
  message: '',
  type: 'info',
})

export function showToast(message, type = 'info', duration = 3000) {
  toast.message = message
  toast.type = type
  if (duration > 0) {
    setTimeout(() => {
      toast.message = ''
    }, duration)
  }
}

export function useToast() {
  return { toast, showToast }
}

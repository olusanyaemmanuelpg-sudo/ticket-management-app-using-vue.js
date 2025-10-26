import { ref } from 'vue'

const toast = ref({
  message: '',
  type: 'info',
  visible: false,
})

export function useToast() {
  const showToast = (message, type = 'info') => {
    toast.value = {
      message,
      type,
      visible: true,
    }

    setTimeout(() => {
      toast.value.visible = false
    }, 3000)
  }
  const hideToast = () => {
    toast.value.visible = false
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}

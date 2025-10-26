import { ref, onMounted } from 'vue'

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)

  onMounted(() => {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        user.value = JSON.parse(session)
      } catch (err) {
        console.error('Failed to parse session:', err)
        localStorage.removeItem('ticketapp_session')
      }
    }
    loading.value = false
  })

  const login = (email, password) => {
    // simple mock auth for demo purposes
    if (email === 'admin@ticket.com' && password === 'password123') {
      const userData = { email, name: 'Admin User', id: 1 }
      localStorage.setItem('ticketapp_session', JSON.stringify(userData))
      user.value = userData
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const signup = (name, email, password) => {
    const userData = { email, name, id: Date.now(), password }
    localStorage.setItem('ticketapp_session', JSON.stringify(userData))
    user.value = userData
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    user.value = null
  }

  return { user, loading, login, signup, logout }
}

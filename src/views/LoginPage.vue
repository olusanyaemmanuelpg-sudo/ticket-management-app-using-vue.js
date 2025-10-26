<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/Auth'
import { useToast } from '@/composables/Toast'
import FooterPage from '@/components/FooterPage.vue'

const router = useRouter()
const { login } = useAuth()
const { showToast } = useToast()

const email = ref('')
const password = ref('')
const errors = ref({})
const showPass = ref(true)

const emailInput = (event) => {
  email.value = event.target.value
  errors.value.email = ''
}

const passwordInput = (event) => {
  password.value = event.target.value
  errors.value.password = ''
}

const showPasswordInput = () => {
  showPass.value = !showPass.value
}

const submitAction = (event) => {
  event.preventDefault()
  const newErrors = {}
  if (!email.value) newErrors.email = 'Email is required'
  if (!password.value) newErrors.password = 'Password is required'

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors
    return
  }

  const result = login(email.value, password.value)
  if (result && result.success) {
    showToast('Login successful!', 'success')
    router.push('/dashboard')
  } else {
    showToast(result?.error || 'Login failed', 'error')
  }
}
</script>

<template>
  <section class="loginSection">
    <div class="loginPage">
      <h2>Welcome Back</h2>
      <p>Login to your account</p>

      <div class="login-input">
        <label for="email">Email</label>
        <input type="email" placeholder="admin@ticket.com" v-model="email" @input="emailInput" />

        <span v-if="errors.email" class="input-error">{{ errors.email }}</span>
      </div>
      <div class="login-input">
        <label for="password">Password</label>
        <input
          :type="showPass ? 'password' : 'text'"
          placeholder="password123"
          v-model="password"
          @input="passwordInput"
        />
        <i
          :class="
            showPass ? 'fa-solid fa-lock password-icon' : 'fa-solid fa-lock-open password-icon'
          "
          @click="showPasswordInput"
        ></i>

        <span v-if="errors.password" class="input-error">{{ errors.password }}</span>
      </div>

      <button class="login-btn" @click="submitAction">Login</button>
      <p class="login-signup">
        Don't have an account?
        <RouterLink to="signin"> Sign up</RouterLink>
      </p>
      <RouterLink to="/">
        <button class="back-to-home">Back to Home</button>
      </RouterLink>
    </div>
  </section>
  <FooterPage />
</template>

<style>
.loginSection {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.loginPage {
  max-width: 420px;
  width: 100%;
  background: rgba(30, 41, 59, 0.8);
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.loginPage h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.loginPage p {
  color: #94a3b8;
  margin-bottom: 2rem;
}
.login-input {
  margin-bottom: 1.5rem;
  position: relative; /* allow absolutely positioned icon inside */
}
.login-input label {
  color: #cbd5e1;
  display: block;
  margin-bottom: 0.5rem;
}
.login-input input {
  width: 100%;
  padding: 0.75rem;
  /* leave space on the right for the icon */
  padding-right: 2.5rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
}
.login-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;
}
.login-signup {
  text-align: center;
}
.login-signup a {
  text-decoration: none;
  color: #3b82f6;
  cursor: pointer;
}
.back-to-home {
  text-decoration: none;
  background: rgba(51, 65, 85, 0.8);
  color: white;
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-sizing: 0 4px;
  z-index: 9999;
  animation: slideIn 0.3s ease;
  max-width: 400px;
}

.input-error {
  color: #ef4444;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}
.password-icon {
  color: white;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
  pointer-events: auto;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/Auth'
import { useToast } from '@/composables/Toast'

const router = useRouter()
const { signup } = useAuth()
const { showToast } = useToast()

const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref({})
const showPass = ref(true)

const fullnameInput = (event) => {
  name.value = event.target.value
  errors.value.fullname = ''
}
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
  if (!name.value) newErrors.fullname = 'Fullname is required'
  if (!email.value) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Please enter a valid email address'
  }
  if (!password.value) {
    newErrors.password = 'Password is required'
  } else if (password.value.length < 8) {
    newErrors.password =
      'Password mus                                                    t be atleast 8 characters long'
  } else if (!/[A-Z]/.test(password.value)) {
    newErrors.password = 'Password must include at least one uppercase letter'
  } else if (!/[a-z]/.test(password.value)) {
    newErrors.password = 'Password must include at least one lowercase letter'
  } else if (!/[0-9]/.test(password.value)) {
    newErrors.password = 'Password must include at least one number'
  } else if (!/[!@#$%^&*]/.test(password.value)) {
    newErrors.password = 'Password must include at least one special character'
  }

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors
    return
  }
  const result = signup(name.value, email.value, password.value)
  if (result && result.success) {
    showToast('Account created successfully', 'success')
    router.push('/dashboard')
  }
}
</script>

<template>
  <section class="Signin-section">
    <div class="signin-page">
      <h2>Create Account</h2>
      <p>Get started with TicketFlow</p>
      <div class="signInput">
        <label for="name"> Full Name</label>
        <input type="text" v-model="name" @input="fullnameInput" />

        <span v-if="errors.fullname" class="input-error">{{ errors.fullname }}</span>
      </div>
      <div class="signInput">
        <label for="email"> Email</label>
        <input type="email" v-model="email" @input="emailInput" />

        <span v-if="errors.email" class="input-error">{{ errors.email }}</span>
      </div>
      <div class="signInput">
        <label for="password"> Password</label>
        <input :type="showPass ? 'password' : 'text'" v-model="password" @input="passwordInput" />
        <i
          :class="
            showPass ? 'fa-solid fa-lock password-icon' : 'fa-solid fa-lock-open password-icon'
          "
          @click="showPasswordInput"
        ></i>

        <span v-if="errors.password" class="input-error">{{ errors.password }}</span>
      </div>

      <button class="signin-btn" @click="submitAction">Sign Up</button>
      <p class="sign-login">Already have an account? <RouterLink to="login">Login</RouterLink></p>
      <RouterLink to="/">
        <button class="back-to-home">Back to Home</button>
      </RouterLink>
    </div>
  </section>
</template>

<style>
.Signin-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.signin-page {
  max-width: 420px;
  width: 100%;
  background: rgba(30, 41, 59, 0.8);
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.signin-page h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.signin-page p {
  color: #94a3b8;
  margin-bottom: 2rem;
}
.signInput {
  margin-bottom: 1.5rem;
  position: relative; /* allow absolute-positioned icon inside */
}
.signInput label {
  color: #cbd5e1;
  display: block;
  margin-bottom: 0.5rem;
}
.signInput input {
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
.signin-btn {
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
.sign-login {
  text-align: center;
}
.sign-login a {
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
  top: 68%;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
  pointer-events: auto;
}
</style>

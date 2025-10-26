import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SigninPage from '@/views/SigninPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/signin',
      name: 'SigninPage',
      component: SigninPage,
    },
  ],
})

export default router

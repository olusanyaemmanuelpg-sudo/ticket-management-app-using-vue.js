import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SigninPage from '@/views/SigninPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import TicketManagement from '@/views/TicketManagement.vue'
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
    {
      path: '/dashboard',
      name: 'DashboardPage',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/manage-tickets',
      name: 'TicketmanagementPage',
      component: TicketManagement,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !user) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router

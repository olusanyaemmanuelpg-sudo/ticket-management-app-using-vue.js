<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/Auth'
import { useToast } from '@/composables/Toast'
import FooterPage from '@/components/FooterPage.vue'

const props = defineProps({
  tickets: {
    type: Array,
    required: true,
  },
})

const router = useRouter()
const { logout, user } = useAuth()
const { showToast } = useToast()

const handleLogout = () => {
  logout()
  showToast('Logged out successfully', 'success')
  router.push('/')
}
const stats = computed(() => ({
  total: props.tickets.length,
  open: props.tickets.filter((t) => t.status === 'open').length,
  inProgress: props.tickets.filter((t) => t.status === 'in_progress').length,
  closed: props.tickets.filter((t) => t.status === 'closed').length,
}))
</script>

<template>
  <main class="dashboard-section">
    <div class="dashboard-page">
      <nav class="dash-nav">
        <h2>TicketFlow</h2>
        <button @click="handleLogout">Logout</button>
      </nav>
      <h1>Welcome, {{ user?.name }} !</h1>
      <p>Here's your ticket overview</p>

      <div class="dashboard-grid">
        <div class="StatcardStyle" style="border: 2px solid #3b82f633">
          <h3>Total Tickets</h3>
          <p>{{ stats.total }}</p>
        </div>
        <div class="StatcardStyle" style="border: 2px solid #10b98133">
          <h3>Open</h3>
          <p>{{ stats.open }}</p>
        </div>
        <div class="StatcardStyle" style="border: 2px solid #f59e0b33">
          <h3>In Progress</h3>
          <p>{{ stats.inProgress }}</p>
        </div>
        <div class="StatcardStyle" style="border: 2px solid #6b728033">
          <h3>Closed</h3>
          <p>{{ stats.closed }}</p>
        </div>
      </div>
      <button class="manage-tickets" @click="router.push('/manage-tickets')">
        Manage Tickets →
      </button>
    </div>
    <FooterPage />
  </main>
</template>

<style>
.dashboard-section {
  min-height: 100vh;
  padding: 0;
}
.dashboard-page {
  max-width: 1440px;
  margin: 0 auto;
}
.dash-nav {
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 2rem;
}
.dash-nav h2 {
  color: white;
  font-size: 1.5rem;
}
.dash-nav button {
  background-color: rgba(51, 65, 85, 0.8);
  text-decoration: none;
  color: white;
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.dashboard-page h1 {
  color: white;
  font-size: 2.7rem;
  margin-bottom: 0.3rem;
  padding: 0 2rem;
}
.dashboard-page p {
  color: #94a3b8;
  margin-bottom: 3rem;
  padding: 0 2rem;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 0 2rem;
}
.StatcardStyle {
  background: rgba(30, 41, 59, 0.8);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.StatcardStyle h3 {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}
.StatcardStyle p {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  padding: 0;
}
.manage-tickets {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  margin-left: 32px;
}
</style>

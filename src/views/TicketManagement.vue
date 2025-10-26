<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FooterPage from '@/components/FooterPage.vue'
import { useToast } from '@/composables/Toast'

const props = defineProps({
  tickets: { type: Array, default: () => [] },
  setTickets: { type: Function, required: true },
})

const router = useRouter()
const { showToast } = useToast()

const ticketsList = computed(() => props.tickets)

const showForm = ref(false)
const editingId = ref(null)
const formData = ref({
  title: '',
  status: 'open',
  description: '',
})
const errors = ref({})

const resetForm = () => {
  formData.value = { title: '', status: 'open', description: '' }
  editingId.value = null
  errors.value = {}
}

const handleSubmit = () => {
  const newErrors = {}
  if (!formData.value.title) newErrors.title = 'Title is required'
  if (!['open', 'in_progress', 'closed'].includes(formData.value.status))
    newErrors.status = 'Invalid status'

  if (!formData.value.description) newErrors.description = 'Description is required'

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors
    return
  }

  if (editingId.value) {
    props.setTickets(
      props.tickets.map((t) => (t.id === editingId.value ? { ...t, ...formData.value } : t)),
    )
    showToast('Ticket updated successfully', 'success')
  } else {
    props.setTickets([
      ...props.tickets,
      { ...formData.value, id: Date.now(), createdAt: Date.now() },
    ])
    showToast('Ticket created successfully', 'success')
  }
  resetForm()
  showForm.value = false
}

const handleEdit = (ticket) => {
  formData.value = {
    title: ticket.title,
    status: ticket.status,
    description: ticket.description || '',
  }
  editingId.value = ticket.id
  showForm.value = true
}

const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    props.setTickets(props.tickets.filter((t) => t.id !== id))
    showToast('Ticket deleted successfully', 'success')
  }
}

const getStatusStyle = (status) => {
  const colors = {
    open: '#10b981',
    in_progress: '#f59e0b',
    closed: '#6b7280',
  }
  return {
    background: `${colors[status]}33`,
    color: colors[status],
    padding: '0.3rem 0.8rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    display: 'inline-block',
  }
}
</script>

<template>
  <main className="manage-tickets-page">
    <section className="manage-ticket">
      <nav>
        <h2>TicketFlow</h2>
        <button @click="router.push('/dashboard')">← Dashboard</button>
      </nav>
      <div className="manage-ticket-flex">
        <h1>Tickets</h1>
        <button
          @click="
            () => {
              showForm = !showForm
              resetForm()
            }
          "
        >
          {{ showForm ? 'cancel' : '+ New Ticket' }}
        </button>
      </div>
      <div v-if="showForm" className="form-section">
        <h3>{{ editingId ? 'Edit Ticket' : 'Create New Ticket' }}</h3>

        <div className="form-input">
          <label for="input">Title *</label>
          <input v-model="formData.title" @input="errors.title = ''" />

          <span v-if="errors.title" className="input-error">{{ errors.title }}</span>
        </div>
        <div className="form-input">
          <label for="status">Status*</label>
          <select className="select-input" v-model="formData.status">
            <option value="open">open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="form-input">
          <label for="description">Description</label>
          <textarea v-model="formData.description" className="desc-input"></textarea>

          <span v-if="errors.description" className="input-error">{{ errors.description }}</span>
        </div>

        <button className="manage-btn" @click="handleSubmit">
          {{ editingId ? 'Update' : 'Create' }} Ticket
        </button>
      </div>

      <div className="manage-grid">
        <div className="manage-grid-container" v-for="ticket in ticketsList" :key="ticket.id">
          <div className="manage-grid-section">
            <div className="firstsection">
              <h3>{{ ticket.title }}</h3>
              <p>{{ ticket.description }}</p>
              <span className="ticket-status" :style="getStatusStyle(ticket.status)">
                {{ ticket.status.replace('_', ' ') }}
              </span>
            </div>
            <div className="secondsection">
              <button className="edit-btn" @click="handleEdit(ticket)">Edit</button>
              <button className="del-btn" @click="handleDelete(ticket.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <FooterPage />
  </main>
</template>

<style>
main {
  padding: 0;
}
.manage-tickets-page {
  min-height: 100vh;
}

nav {
  margin-bottom: 2rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav button {
  background: rgba(51, 65, 85, 0.8);
  color: white;
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 0.75rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}
nav h2 {
  font-size: 1.6rem;
}

.manage-ticket-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0 1.5rem;
  padding: 0 2rem;
  flex-wrap: wrap;
}
.manage-ticket-flex h1 {
  color: white;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}
.manage-ticket-flex button,
.manage-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  padding: 0.9rem 1.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.form-section {
  background: rgba(30, 41, 59, 0.8);
  padding: 1.5rem;
  margin: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.form-section h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.form-input {
  margin-bottom: 1rem;
}
.form-input label {
  color: #cbd5e1;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.form-input input,
.select-input,
.desc-input {
  width: 100%;
  padding: 0.8rem;
  background: rgba(15, 23, 42, 0.6);
  font-size: 1rem;
  color: white;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.3);
}
.desc-input {
  min-height: 100px;
}
.manage-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 0 2rem;
}
.manage-grid-container {
  background: rgba(30, 41, 59, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(148, 163, 184, 0.1);
}
.manage-grid-section {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.firstsection {
  flex: 1;
}
.firstsection h3 {
  color: white;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
.firstsection p {
  color: #94a3b8;
  margin-bottom: 1.2rem;
}
.secondsection {
  display: flex;
  gap: 0.5rem;
}

.edit-btn {
  background: rgba(51, 65, 85, 0.8);
  color: white;
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.del-btn {
  background: #ef4444;
  color: white;
  border: 1px solid rgba(148, 163, 184, 0.3);
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-error {
  color: #ef4444;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.25rem;
}

@media (max-width: 500px) {
  .manage-grid-section {
    display: block;
    gap: 30px;
  }
  .ticket-status {
    margin-bottom: 15px;
  }
}
</style>

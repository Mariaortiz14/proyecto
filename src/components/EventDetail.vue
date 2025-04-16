<template>
  <div class="container">
    <div v-if="event" class="event-card">
      <h1 class="event-title">{{ event.title }}</h1>
      <p class="event-info"><strong>Descripción:</strong> {{ event.description }}</p>
      <p class="event-info"><strong>Fecha:</strong> {{ formattedDate }}</p>
      <p class="event-info"><strong>Ubicación:</strong> {{ event.location }}</p>
      <p class="event-info"><strong>Categoría:</strong> {{ event.category }}</p>
      <p class="event-info">
        <strong>Organizado por:</strong> {{ event.user.name }} ({{ event.user.email }})
      </p>
      <div v-if="isOwner" class="action-buttons">
        <button @click="goToEdit" class="btn-edit">Editar</button>
        <button @click="confirmDelete" class="btn-delete">Eliminar</button>
      </div>
    </div>

    <div v-else class="loading">Cargando evento...</div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EventDetail',
  data() {
    return {
      event: null,
      isOwner: false
    }
  },
  computed: {
    formattedDate() {
      return this.event
        ? new Date(this.event.event_date).toLocaleString()
        : ''
    }
  },
  methods: {
    async loadEvent() {
      const eventId = this.$route.params.id
      try {
        const response = await axios.get(`http://localhost:8000/events/${eventId}`)
        this.event = response.data

        const currentUserId = parseInt(localStorage.getItem('user_id'))
        this.isOwner = this.event.user.id === currentUserId
      } catch (error) {
        console.error('Error al cargar el evento:', error)
      }
    },
    goToEdit() {
      this.$router.push({ name: 'EditEvent', params: { id: this.event.id } })
    },
    confirmDelete() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el evento permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('token')
            await axios.delete(`http://localhost:8000/events/${this.event.id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            Swal.fire('Eliminado', 'El evento fue eliminado correctamente', 'success')
            this.$router.push('/mis-eventos')
          } catch (error) {
            console.error('Error al eliminar el evento:', error)
            Swal.fire('Error', 'No se pudo eliminar el evento', 'error')
          }
        }
      })
    }
  },
  created() {
    this.loadEvent()
  }
}
</script>



<style>
.btn-edit,
.btn-delete {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-edit {
  background-color: #007bff;
  color: white;
}
.btn-delete {
  background-color: #dc3545;
  color: white;
}
textarea {
  width: 100%;
  min-height: 80px;
  margin-top: 10px;
  padding: 8px;
}
.comment-section {
  margin-top: 20px;
}
.comment-card {
  background-color: #f5f5f5;
  padding: 10px;
  margin: 8px 0;
  border-radius: 6px;
}
.comment-date {
  font-size: 0.8rem;
  color: gray;
}
.login-warning {
  color: red;
  font-style: italic;
}
.action-buttons {
  margin-top: 20px;
}
</style>

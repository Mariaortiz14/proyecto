<template><h1>Editar Evento</h1>
  <div class="event-detail">
    
    <div v-if="event" class="event-card">
      <h1>{{ event.title }}</h1>
      <p><strong>Fecha:</strong> {{ formatDate(event.event_date) }}</p>
      <p><strong>Descripción:</strong> {{ event.description }}</p>
      
      <div class="actions">
        <button @click="editEvent" class="btn-edit">Editar Evento</button>
      </div>
    </div>
    <div v-else class="loading">
      <p>Cargando detalles del evento...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EventDetail",
  data() {
    return {
      event: null, 
      error: null, 
    };
  },
  methods: {
    async fetchEvent() {
      try {
        const eventId = this.$route.params.id; 
        if (!eventId) {
          this.error = "No se proporcionó un ID de evento válido.";
          return;
        }
        const response = await axios.get(`http://localhost:8000/events/${eventId}`);
        this.event = response.data; 
      } catch (error) {
        console.error("Error al cargar los detalles del evento:", error);
        this.error = "Hubo un problema al cargar los detalles del evento.";
      }
    },
    formatDate(date) {
      if (!date) return "Fecha no disponible";
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      const eventDate = new Date(date);
      return eventDate.toLocaleDateString("es-ES", options);
    },
    editEvent() {
      if (this.event) {
        this.$router.push(`/events/edit/${this.event.id}`);
      }
    },
  },
  mounted() {
    this.fetchEvent(); 
  },
};
</script>

<style>
.event-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(0deg, rgba(77, 77, 77, 1) 0%, rgba(140, 168, 255, 1) 19%, rgba(189, 137, 254, 1) 60%, rgba(252, 244, 244, 1) 90%);
}

.event-card {
  width: 90%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.event-card h1 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #333;
}

.event-card p {
  font-size: 1rem;
  margin: 10px 0;
  color: #555;
}

.event-card .actions {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-edit {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.loading {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
}
</style>

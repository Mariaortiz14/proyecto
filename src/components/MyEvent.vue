<template>
  <div class="my-events">
    <h1>Mis Eventos</h1>
    <router-link to="/create-event">
      <button class="btn-create-event">Crear Nuevo Evento</button>
    </router-link>

    <div v-if="events.length > 0" class="event-cards-container">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p><strong>Fecha:</strong> {{ formatDate(event.event_date) }}</p>
        <p><strong>Descripción:</strong> {{ event.description }}</p>
        <button @click="goToEventDetail(event)" class="view-details">Ver detalles</button>
        

      </div>
    </div>

    <div v-else>
      <p>No tienes eventos programados.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyEvent",
  data() {
    return {
      events: [], 
    };
  },
  mounted() {
    this.loadUserEvents(); 
  },
  methods: {
    async loadUserEvents() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        alert("Usuario no autenticado");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}/events/`);
        console.log("Eventos recibidos:", response.data); 
        this.events = response.data;
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
        alert("Hubo un error al cargar los eventos.");
      }
    },
    formatDate(date) {
      if (!date) return "Fecha no disponible";

      const options = { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false 
      };
      const eventDate = new Date(date);
      return eventDate.toLocaleString("es-ES", options);
    },
    goToEventDetail(event) {
      this.$router.push(`/events/${event.id}`);
    },
  },
};
</script>


<style>
.my-events {
  padding: 100px;
  text-align: center;
  background: rgb(77,77,77);
background: linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(140,168,255,1) 19%, rgba(189,137,254,1) 60%, rgba(252,244,244,1) 90%);
 
}

.btn-create-event {
  padding: 10px 30px;
  margin: 20px;
  background-color: #a828d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-create-event:hover {
  background-color: #9815ee;
}


.event-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; 
  gap: 20px; 
}

.event-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 200px;
  flex-grow: 1;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.event-card:hover {
  transform: scale(1.05);
}

h3 {
  color: #333;
}

p {
  color: #555;
}

.view-details {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-details:hover {
  background-color: #0056b3;
}
</style>


  
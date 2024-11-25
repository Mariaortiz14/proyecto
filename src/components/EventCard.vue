<template>
  <div class="event-card" @click="goToEventDetail">
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p><strong>Fecha:</strong> {{ formatDate(event.event_date) }}</p>
    <button class="view-details">Ver detalles</button>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: Object // Recibe un evento individual
  },
  methods: {
    goToEventDetail() {
      // Navegar a la página de detalle del evento cuando se hace clic
      this.$router.push(`/events/${this.event.id}`);
    },
    formatDate(date) {
      const eventDate = new Date(date);
      return eventDate.toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
  }
};
</script>

<style>
.event-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.event-card:hover {
  transform: scale(1.05);
}

h2 {
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

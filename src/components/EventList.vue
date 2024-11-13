<template>
  <div class="events-page">
    <header class="events-header">
      <h1>Bienvenida, Sara</h1>
      <p>Explora los eventos disponibles:</p>
    </header>

    <main class="events-list">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
        <div class="event-details">
          <span><strong>Fecha:</strong> {{ event.date }}</span>
          <span><strong>Ubicación:</strong> {{ event.location }}</span>
        </div>
        <button class="edit-button" @click="editEvent(event.id)">Editar evento</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'EventsView',
  data() {
    return {
      events: [
        { id: 1, title: 'Concierto de Jazz', description: 'Una noche de jazz en vivo.', date: '5 de Noviembre, 2024', location: 'Teatro Principal' },
        { id: 2, title: 'Feria de Libros', description: 'Explora una amplia colección de libros.', date: '12 de Noviembre, 2024', location: 'Plaza Central' },
        { id: 3, title: 'Exposición de Arte', description: 'Obras de artistas locales.', date: '18 de Noviembre, 2024', location: 'Museo de Arte Moderno' },
        { id: 4, title: 'Taller de Fotografía', description: 'Aprende técnicas de fotografía.', date: '22 de Noviembre, 2024', location: 'Centro Cultural' },
        { id: 5, title: 'Clase de Yoga al Aire Libre', description: 'Clase gratuita de yoga para todos.', date: '25 de Noviembre, 2024', location: 'Parque Metropolitano' }
      ]
    };
  },
  methods: {
    editEvent(id) {
      alert(`Editar evento con ID: ${id}`);
    }
  }
};
</script>

<style scoped>
.events-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.events-header {
  text-align: center;
  margin-bottom: 30px;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.event-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.event-card:hover {
  transform: translateY(-4px);
}

.event-card h2 {
  margin: 0 0 10px;
  color: #333;
}

.event-details {
  margin: 10px 0;
  color: #555;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}
</style>

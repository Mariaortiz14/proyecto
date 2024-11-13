<template>
  <div class="home">
    <header>
      <h1>Bienvenido, {{ userName }}</h1>
    </header>
    <section>
      <h2>Próximos Eventos</h2>
      <ul v-if="events-list.length">
        <li v-for="event in events" :key="event.id" class="event-item">
          <h3>{{ event.name }}</h3>
          <p>{{ event.description }}</p>
          <p><strong>Fecha:</strong> {{ new Date(event.date).toLocaleDateString() }}</p>
          <p><strong>Ubicación:</strong> {{ event.location }}</p>
        </li>
      </ul>
      <p v-else>No hay eventos disponibles en este momento.</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      username: localStorage.getItem('userName') || 'Usuario' ,
      events: []
    };
  },
  created() {
    this.username = localStorage.getItem('userName') || 'Invitado';
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:8000/events/');
        this.events = response.data;
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
        alert("No se pudieron cargar los eventos. Intente nuevamente más tarde.");
      }
    }
  }
};
</script>


<style>
.home {
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  margin-bottom: 20px;
}

h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 0.5em;
}

section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-item {
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #ccc;
}

h2 {
  color: #555;
  font-size: 1.5em;
}

h3 {
  font-size: 1.3em;
  color: #444;
}

p {
  color: #666;
  margin: 5px 0;
}
</style>

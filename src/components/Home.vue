<template>
  <div class="home">
    <header>
      <h1>Bienvenido, {{ username }}</h1>
    </header>
    <EventList :events="events" />
  </div>
</template>

<script>
import axios from 'axios';
import EventList from './Events.vue';

export default {
  name: 'Home',
  components: {
    EventList
  },
  data() {
    return {
      username: localStorage.getItem('userName') || 'Usuario',
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
</style>

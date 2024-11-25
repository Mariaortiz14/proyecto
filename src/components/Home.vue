<template>
  <div class="home">
    <header>
      <h1>Bienvenido, {{ username }}</h1>
    </header>
    <!-- Asegúrate de que el componente EventList reciba los eventos correctamente -->
    
  </div>
</template>

<script>
import axios from 'axios';
import EventList from './EventList.vue'; // Asegúrate de que el nombre del componente sea correcto

export default {
  name: 'Home',
  components: {
    EventList
  },
  data() {
    return {
      username: localStorage.getItem('userName') || 'Usuario', // Obtener el nombre del usuario al cargar
      events: []  // Para almacenar los eventos cargados desde el backend
    };
  },
  created() {
    this.fetchEvents(); // Llamar a la función para cargar los eventos
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:8000/events/'); // Cambia la URL si es necesario
        this.events = response.data;  // Asignar los eventos a la variable 'events'
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

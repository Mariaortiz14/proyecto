<template>
  <div class="fondo">
  <div class="calendar-page">
    <header class="calendar-header">
      <h1>Mi Calendario</h1>
      <p>Aquí está tu calendario:</p>
    </header>

    <main class="calendar-container">
      <vue-cal
        class="vuecal"
        :time="false"
        default-view="month"
        :events="calendarEvents"
      />
    </main>
  </div>
  </div>
</template>

<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css' 
import axios from 'axios'

export default {
  name: 'CalendarView',
  
  components: {
    VueCal
  },
  
  data() {
    return {
      calendarEvents: [
        { start: '2024-12-01T10:00:00', end: '2024-12-01T12:00:00', title: 'Evento de prueba', description: 'Este es un evento de prueba.' },
        { start: '2024-12-05T14:00:00', end: '2024-12-05T16:00:00', title: 'Evento Test', description: 'Descripción del evento de prueba.' },
        { start: '2024-12-10T18:00:00', end: '2024-12-10T20:00:00', title: 'Reunión importante', description: 'Reunión de trabajo.' }
      ]
    };
  },

  mounted() {
    // Llamar a loadUserEvents() solo si los eventos manuales no se muestran
    // this.loadUserEvents();
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

        const events = response.data.map(event => ({
          start: event.event_date,  
          end: event.event_date,   
          title: event.title,
          description: event.description
        }));

        console.log("Eventos formateados para el calendario:", events);
        this.calendarEvents = events;
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
        alert("Hubo un error al cargar los eventos.");
      }
    }
  }
};
</script>


<style>
.fondo{
  background: rgb(77,77,77);
background: linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(140,168,255,1) 19%, rgba(189,137,254,1) 60%, rgba(252,244,244,1) 90%);
 
}
.calendar-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: rgb(77,77,77);
background: linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(140,168,255,1) 19%, rgba(189,137,254,1) 60%, rgba(252,244,244,1) 90%);
 
}

.calendar-header {
  text-align: center;
  margin-bottom: 20px;
}

.calendar-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffff;
  border-radius : 10px 10px 10px 10px;
}

.vuecal {
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>

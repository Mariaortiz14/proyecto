<template>
  <div class="fondo">
    <div class="calendar-page">
      <header class="calendar-header">
        <h1>Mi Calendario</h1>
        <p>Explora tus eventos programados:</p>
      </header>

      <main class="calendar-container">
        <vue-cal
          class="vuecal"
          :time="false"
          default-view="month"
          :events="calendarEvents"
          @event-click="showEventDetails"
          :on-event-overlap="false"
        />
      </main>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Swal from "sweetalert2";

export default {
  name: "CalendarView",
  components: {
    VueCal,
  },
  data() {
    return {
      calendarEvents: [
        {
          start: "2024-12-01T10:00:00+00:00",
          end: "2024-12-01T12:00:00+00:00",
          title: "Evento de prueba",
          description: "Este es un evento de prueba.",
        },
        {
          start: "2024-12-05T14:00:00+00:00",
          end: "2024-12-05T16:00:00+00:00",
          title: "Evento Test",
          description: "Descripción del evento de prueba.",
        },
        {
          start: "2024-12-10T18:00:00+00:00",
          end: "2024-12-10T20:00:00+00:00",
          title: "Reunión importante",
          description: "Reunión de trabajo.",
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadDynamicEvents();
    }, 1000);
  },
  methods: {
    loadDynamicEvents() {
      const dynamicEvents = [
        {
          start: "2024-12-15T09:00:00+00:00",
          end: "2024-12-15T10:30:00+00:00",
          title: "Evento dinámico",
          description: "Evento cargado dinámicamente.",
        },
        {
          start: "2024-12-20T13:00:00+00:00",
          end: "2024-12-20T15:00:00+00:00",
          title: "Otra reunión",
          description: "Reunión importante.",
        },
      ];
      this.calendarEvents = [...this.calendarEvents, ...dynamicEvents];
    },
    showEventDetails(event) {
      Swal.fire({
        title: event.title,
        html: `<p><strong>Fecha:</strong> ${this.formatDate(
          event.start
        )}</p><p>${event.description || "Sin descripción"}</p>`,
        icon: "info",
        confirmButtonText: "Cerrar",
      });
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(date).toLocaleDateString("es-ES", options);
    },
  },
};
</script>

<style>
.fondo {
  background: rgb(77, 77, 77);
  background: linear-gradient(
    0deg,
    rgba(77, 77, 77, 1) 0%,
    rgba(140, 168, 255, 1) 19%,
    rgba(189, 137, 254, 1) 60%,
    rgba(252, 244, 244, 1) 90%
  );
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.calendar-header {
  text-align: center;
  margin-bottom: 20px;
}

.calendar-header h1 {
  color: #333;
  font-size: 2.5rem;
}

.calendar-header p {
  font-size: 1.2rem;
  color: #555;
}

.calendar-container {
  max-width: 900px;
  margin: 0 auto;
}

.vuecal {
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vuecal .vuecal__cell--current-day {
  background-color: #e3f2fd;
}

.vuecal .vuecal__event {
  background-color: #007bff;
  color: white;
  border-radius: 8px;
}

.vuecal .vuecal__event:hover {
  background-color: #0056b3;
}
</style>

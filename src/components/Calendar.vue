<template>
  <div class="calendar-fondo">
    <div class="calendar-wrapper">
      <h1>Eventos futuros</h1>

      <div class="calendar-nav">
        <button @click="prevMonth" :disabled="isCurrentMonth">←</button>
        <span>{{ monthYear }}</span>
        <button @click="nextMonth">→</button>
      </div>

      <div class="calendar-grid">
        <div
          v-for="day in daysInMonth"
          :key="day.date"
          class="calendar-day"
          :class="{ 'has-event': day.events.length > 0 }"
          @click="day.events.length && showEvents(day.events)"
        >
          <span class="day-number">{{ day.date.getDate() }}</span>
          <ul v-if="day.events.length" class="event-list">
            <li v-for="event in day.events.slice(0, 2)" :key="event.id">{{ event.title }}</li>
            <li v-if="day.events.length > 2">+{{ day.events.length - 2 }} más</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CalendarView",
  data() {
    const today = new Date();
    return {
      daysInMonth: [],
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      today,
      isLoading: true,
    };
  },
  computed: {
    monthYear() {
      const date = new Date(this.currentYear, this.currentMonth);
      return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
    },
    isCurrentMonth() {
      return (
        this.currentMonth === this.today.getMonth() &&
        this.currentYear === this.today.getFullYear()
      );
    },
  },
  mounted() {
    this.generateDays();
  },
  methods: {
    async generateDays() {
      this.isLoading = true;
      const year = this.currentYear;
      const month = this.currentMonth;
      const days = new Date(year, month + 1, 0).getDate();

      const dayArray = [];
      for (let i = 1; i <= days; i++) {
        dayArray.push({
          date: new Date(year, month, i),
          events: [],
        });
      }

      try {
        const response = await axios.get("http://localhost:8000/events/");
        const events = response.data;

        for (const event of events) {
          const eventDate = new Date(event.event_date);
          if (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month
          ) {
            const dayIndex = eventDate.getDate() - 1;
            if (dayArray[dayIndex]) {
              dayArray[dayIndex].events.push(event);
            }
          }
        }

        this.daysInMonth = dayArray;
      } catch (error) {
        console.error("Error al cargar eventos:", error);
        Swal.fire("Error", "No se pudieron cargar los eventos.", "error");
      } finally {
        this.isLoading = false;
      }
    },
    showEvents(events) {
      const html = events
        .map(
          (e) =>
            `<p><strong>${e.title}</strong><br>${e.description || "Sin descripción"}<br><small>${new Date(
              e.event_date
            ).toLocaleDateString("es-ES")}</small></p>`
        )
        .join("<hr>");

      Swal.fire({
        title: `Eventos (${events.length})`,
        html,
        icon: "info",
        width: 600,
        confirmButtonText: "Cerrar",
        background: "#1f1f1f",
        color: "#fff"
      });
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.generateDays();
    },
    prevMonth() {
      if (!this.isCurrentMonth) {
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.currentYear--;
        } else {
          this.currentMonth--;
        }
        this.generateDays();
      }
    },
  },
};
</script>


<style>
.calendar-fondo {
  background: radial-gradient(circle at center, #1f1f1f 0%, #000000 100%);
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.calendar-wrapper {
  max-width: 800px;
  width: 100%;
  background: linear-gradient(135deg, #ffbc00, #ff0058);
  padding: 20px;
  border-radius: 1.5em;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  color: #fff;
  transition: transform 0.3s ease;
}

.calendar-wrapper:hover {
  transform: translateY(-10px);
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.calendar-nav button {
  background-color: #ff0058;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.calendar-nav button:hover {
  background-color: #e6004e;
}

.calendar-nav button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 días de la semana */
  gap: 10px;
}

.calendar-day {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 10px;
  height: 100px;
  position: relative;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.2s;
  overflow: hidden;
}

.calendar-day:hover {
  transform: scale(1.03);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
}

.calendar-day.has-event {
  border: 2px solid #fff;
}

.day-number {
  font-weight: bold;
  font-size: 1rem;
  color: #ffd;
}

.event-list {
  list-style: none;
  padding: 0;
  margin-top: 6px;
}

.event-list li {
  font-size: 0.7rem;
  color: #ffe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

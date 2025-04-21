<template>
  <div class="eventDetail">
    <div class="card">
      <span>
        <div class="content">
          <div class="event-detail">
            <h1>{{ event.title }}</h1>
            <p><strong>Publicado por:</strong> {{ event.user?.name || 'Anónimo' }}</p>
            <p><strong>Descripción:</strong> {{ event.description }}</p>
            <p><strong>Fecha:</strong> {{ formattedDate }}</p>
            <p><strong>Lugar:</strong> {{ event.location }}</p>
            <p><strong>Categoría:</strong> {{ event.category }}</p>
          </div>
        </div>
      </span>
      <Comments :eventId="event.id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Comments from './Comments.vue'

export default {
  name: 'GuestEventDetail',
  components: {
    Comments
  },
  data() {
    return {
      event: null
    }
  },
  computed: {
    formattedDate() {
      return this.event
        ? new Date(this.event.event_date).toLocaleString()
        : ''
    }
  },
  created() {
    const eventId = this.$route.params.id

    axios
      .get(`${import.meta.env.VITE_API_URL}/events/${eventId}`)
      .then((response) => {
        this.event = response.data
        console.log('Evento cargado:', this.event)
      })
      .catch((error) => {
        console.error('Error al cargar el evento:', error)
      })
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.eventDetail {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px; /* espacio para el header */
  padding-bottom: 100px; /* espacio para el footer */
  box-sizing: border-box;
}

/* Fondo animado suave tipo ondas/luz */
.eventDetail::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,0,150,0.2), transparent 40%),
              radial-gradient(circle, rgba(0,255,255,0.15), transparent 30%),
              radial-gradient(circle, rgba(255,255,0,0.1), transparent 50%);
  animation: moveBackground 30s linear infinite;
  z-index: 0;
}

/* Animación del fondo */
@keyframes moveBackground {
  0% {
    transform: translate(0%, 0%) rotate(0deg);
  }
  50% {
    transform: translate(25%, 25%) rotate(180deg);
  }
  100% {
    transform: translate(0%, 0%) rotate(360deg);
  }
}

.card {
  position: relative;
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  transition: transform 0.3s ease;
  z-index: 1;
}

.card:hover {
  transform: translateY(-10px);
}

.card .content {
  border-radius: 15px;
  padding: 20px;
  line-height: 1.5;
}

.card h1 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #ffffff;
}

.card p {
  font-size: 1em;
  margin: 6px 0;
  color: #e0e0e0;
}

</style>
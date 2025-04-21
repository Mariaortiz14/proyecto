<template>
  <div class="fondo">
    <div class="my-events-wrapper">
      <h1 class="titulo">Mis Eventos</h1>

      <router-link to="/create-event">
        <button class="btn-primary">Crear Nuevo Evento</button>
      </router-link>

      <div v-if="events.length" class="event-grid">
        <div v-for="event in events" :key="event.id" class="event-card">
          <div class="icon-circle">
            <svg width="36" height="36" fill="white" viewBox="0 0 24 24">
              <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" />
            </svg>
          </div>

          <h3>{{ event.title }}</h3>
          <p><strong>Fecha:</strong> {{ formatDate(event.event_date) }}</p>
          <p><strong>Descripción:</strong> {{ event.description }}</p>

          <div class="card-actions">
            <button class="btn-edit" @click="editEvent(event.id)">Editar</button>
            <button class="btn-delete" @click="confirmDelete(event.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <div v-else class="no-events">
        <p>No tienes eventos programados.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "MyEvents",
  data() {
    return {
      events: [], // Lista de eventos
    };
  },
  mounted() {
    this.loadUserEvents(); // Cargar los eventos del usuario cuando el componente se monte
  },
  methods: {
    // Función para cargar los eventos del usuario
    async loadUserEvents() {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        return Swal.fire("Error", "Usuario no autenticado", "error"); // Mostrar error si no está autenticado
      }

      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/users/${userId}/events/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir token en la cabecera
          },
        });
        this.events = response.data; // Asignar los eventos al arreglo
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
        Swal.fire("Error", "Hubo un error al cargar tus eventos.", "error"); // Mostrar mensaje de error
      }
    },

    // Función para formatear la fecha del evento
    formatDate(date) {
      const eventDate = new Date(date);
      return eventDate.toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },

    // Función para redirigir al formulario de edición de evento
    editEvent(id) {
      this.$router.push(`/events/edit/${id}`); // Redirigir a la página de edición
    },

    // Función para confirmar la eliminación de un evento
    async confirmDelete(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        return Swal.fire("Error", "No estás autenticado", "error"); // Si no está autenticado
      }

      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el evento permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          // Eliminar el evento
          await axios.delete(`${process.env.VUE_APP_API_URL}/events/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          Swal.fire("Eliminado", "El evento ha sido eliminado con éxito.", "success");
          this.loadUserEvents(); // Recargar los eventos
        } catch (error) {
          console.error("Error al eliminar el evento:", error);
          Swal.fire("Error", "No se pudo eliminar el evento", "error"); // Mostrar mensaje de error
        }
      }
    },
  },
};
</script>


<style>
.fondo {
  background: radial-gradient(circle at center, #1f1f1f 0%, #000000 100%);
  min-height: 100vh;
  padding: 40px 0;
}

.my-events-wrapper {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  background: linear-gradient(135deg, #ffbc00, #ff0058);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  color: #fff;
}

.titulo {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #ff0058;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 30px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #e6004e;
}

.event-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.event-card {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  width: 280px;
  border-radius: 1em;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.event-card:hover {
  transform: scale(1.03);
}

.event-card h3 {
  margin-top: 15px;
  font-size: 1.3rem;
  color: #ffd;
}

.event-card p {
  color: #ccc;
  margin: 10px 0;
  font-size: 0.95rem;
}

.card-actions {
  margin-top: auto;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-edit {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-edit:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: #c82333;
}

.icon-circle {
  background: #ff0058;
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-events {
  text-align: center;
  font-size: 1.2rem;
  color: #eee;
  padding: 40px 0;
}
</style>

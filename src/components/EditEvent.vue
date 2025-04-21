<template>
  <div class="fondo">
    <div class="edit-event">
      <h1>Editar Evento</h1>
      <form @submit.prevent="updateEvent">
        <div class="form-group">
          <label for="title">Título del Evento:</label>
          <input
            type="text"
            id="title"
            v-model="event.title"
            required
            placeholder="Título del evento"
          />
        </div>

        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea
            id="description"
            v-model="event.description"
            required
            placeholder="Describe tu evento"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="event_date">Fecha y Hora:</label>
          <input
            type="datetime-local"
            id="event_date"
            v-model="event.event_date"
            required
          />
        </div>

        <div class="form-group">
          <label for="location">Ubicación:</label>
          <input
            type="text"
            id="location"
            v-model="event.location"
            required
            placeholder="Ej: Teatro Municipal, Ciudad"
          />
        </div>

        <div class="form-group">
          <label for="category">Categoría:</label>
          <select id="category" v-model="event.category" required>
            <option disabled value="">Selecciona una categoría</option>
            <option>gastronomía</option>
            <option>conferencias</option>
            <option>deportes</option>
            <option>festival</option>
            <option>conciertos</option>
            <option>teatros</option>
            <option>otro</option>
          </select>
        </div>
        <div class="actions">
          <button type="submit" class="btn-save">Guardar Cambios</button>
          <button type="button" class="btn-cancel" @click="cancelEdit">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditEvent",
  data() {
    return {
      event: {
        title: "",
        description: "",
        event_date: "",
        location: "",
        category: "",
      },
    };
  },
  mounted() {
    this.fetchEventDetails();
  },
  methods: {
    async fetchEventDetails() {
      const eventId = this.$route.params.id;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${eventId}`);
        this.event = response.data;
      } catch (error) {
        console.error("Error al cargar los detalles del evento:", error);
        Swal.fire("Error", "No se pudieron cargar los detalles del evento.", "error");
      }
    },
    async updateEvent() {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "No estás autenticado", "error");
        return;
      }

      const eventId = this.$route.params.id;

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${eventId}`,
          {
            title: this.event.title,
            description: this.event.description,
            event_date: this.event.event_date,
            location: this.event.location,
            category: this.event.category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("Éxito", "Evento actualizado correctamente.", "success");
        this.$router.push("/my-events");
      } catch (error) {
        console.error("Error al actualizar el evento:", error);
        Swal.fire("Error", "Hubo un error al actualizar el evento.", "error");
      }
    },
    cancelEdit() {
      this.$router.push("/my-events");
    },
  },
};
</script>

<style>
.fondo {
  background: radial-gradient(circle at center, #1f1f1f 0%, #000000 100%);
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.edit-event {
  max-width: 650px;
  width: 100%;
  background: linear-gradient(135deg, #ffbc00, #ff0058);
  padding: 30px;
  border-radius: 1.5em;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  color: #fff;
}

.edit-event h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #fffbe7;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #ffd;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #222;
  color: #fff;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.btn-save,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}

.btn-save {
  background-color: #00d26a;
  color: white;
}

.btn-save:hover {
  background-color: #00b25a;
}

.btn-cancel {
  background-color: #555;
  color: white;
}

.btn-cancel:hover {
  background-color: #444;
}

</style>

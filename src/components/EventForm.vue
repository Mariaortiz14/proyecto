<template>
  <div class="fondo">
    <div class="event-form-container">
      <h1>Crear Nuevo Evento</h1>
      <form @submit.prevent="createEvent">
        <div class="form-group">
          <label for="title">Título:</label>
          <input v-model="title" type="text" id="title" required />
        </div>

        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea v-model="description" id="description" required></textarea>
        </div>

        <div class="form-group">
          <label for="event_date">Fecha del Evento:</label>
          <input v-model="event_date" type="datetime-local" id="event_date" required />
        </div>

        <div class="form-group">
          <label for="location">Ubicación:</label>
          <input v-model="location" type="text" id="location" required />
        </div>

        <div class="form-group">
          <label for="category">Categoría:</label>
          <select v-model="category" id="category" required>
            <option disabled value="">Selecciona una categoría</option>
            <option value="gastronomía">Gastronomía</option>
            <option value="conferencias">Conferencias</option>
            <option value="deportes">Deportes</option>
            <option value="festival">Festival</option>
            <option value="conciertos">Conciertos</option>
            <option value="teatros">Teatros</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div class="actions">
          <button type="submit" class="btn-primary">Crear Evento</button>
          <button type="button" class="btn-secondary" @click="cancelCreation">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CreateEvent",
  data() {
    return {
      title: "",
      description: "",
      event_date: "",
      location: "",
      category: "",
    };
  },
  methods: {
    async createEvent() {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        return Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Usuario no autenticado",
        });
      }

      if (!this.title || !this.description || !this.event_date || !this.location || !this.category) {
        return Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor completa todos los campos.",
        });
      }

      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("event_date", this.event_date);
      formData.append("location", this.location);
      formData.append("category", this.category);

      try {
        await axios.post("http://localhost:8000/events/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Evento creado",
          text: "Tu evento se ha creado correctamente",
        });

        this.$router.push("/my-events");
      } catch (error) {
        console.error("Error al crear el evento:", error);
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "No se pudo crear el evento. Inténtalo de nuevo.",
        });
      }
    },
    cancelCreation() {
      Swal.fire({
        title: "¿Cancelar creación?",
        text: "Perderás toda la información ingresada.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "Seguir editando",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/my-events");
        }
      });
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

.event-form-container {
  max-width: 600px;
  width: 100%;
  background: linear-gradient(135deg, #ffbc00, #ff0058);
  padding: 30px;
  border-radius: 1.5em;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  color: #fff;
}

.event-form-container h1 {
  text-align: center;
  margin-bottom: 25px;
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

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: #ff0058;
  color: white;
}

.btn-primary:hover {
  background-color: #e6004e;
}

.btn-secondary {
  background-color: #555;
  color: white;
}

.btn-secondary:hover {
  background-color: #444;
}
</style>

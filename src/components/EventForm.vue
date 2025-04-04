<template>
  <div class="event-form">
    <h1>Crear Nuevo Evento</h1>
    <form @submit.prevent="createEvent" enctype="multipart/form-data">
      <div>
        <label for="title">Título:</label>
        <input v-model="title" type="text" id="title" required />
      </div>
      <div>
        <label for="description">Descripción:</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div>
        <label for="event_date">Fecha del Evento:</label>
        <input v-model="event_date" type="datetime-local" id="event_date" required />
      </div>
      <div>
        <label for="location">Ubicación:</label>
        <input v-model="location" type="text" id="location" required />
      </div>
      <div>
        <label for="category">Categoría:</label>
        <select v-model="category" id="category" required>
          <option value="gastronomía">Gastronomía</option>
          <option value="conferencias">Conferencias</option>
          <option value="deportes">Deportes</option>
          <option value="festival">Festival</option>
          <option value="conciertos">Conciertos</option>
          <option value="teatros">Teatros</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label for="image">Imagen:</label>
        <input type="file" @change="handleFileUpload" id="image" accept="image/*" />
      </div>
      <button type="submit">Crear Evento</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "",
      description: "",
      event_date: "",
      location: "", // Nuevo campo
      category: "", // Nuevo campo
      image: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    async createEvent() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Usuario no autenticado",
        });
        return;
      }

      if (!this.title || !this.description || !this.event_date || !this.location || !this.category) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Por favor completa todos los campos obligatorios",
        });
        return;
      }

      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("event_date", this.event_date);
      formData.append("location", this.location); // Nuevo campo
      formData.append("category", this.category); // Nuevo campo
      if (this.image) {
        formData.append("image", this.image);
      }

      try {
        await axios.post("http://localhost:8000/events/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({
          icon: "success",
          title: "Evento creado con éxito",
          text: "Tu evento se ha creado correctamente",
        });

        this.$router.push("/my-events");
      } catch (error) {
        console.error("Error al crear el evento:", error.response || error);
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "No se pudo crear el evento, por favor intenta de nuevo.",
        });
      }
    },
  },
};
</script>


<style>
  .event-form {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  input, textarea {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
</style>

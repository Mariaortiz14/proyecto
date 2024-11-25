<template>
  <div class="event-form">
    <h1>Crear Nuevo Evento</h1>
    <form @submit.prevent="createEvent">
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
        <label for="image_url">Imagen (URL):</label>
        <input v-model="image_url" type="text" id="image_url" />
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
      image_url: "",
    };
  },
  methods: {
    async createEvent() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Usuario no autenticado',
        });
        return;
      }
      console.log({
        user_id: userId,  
        title: this.title,
        description: this.description,
        event_date: this.event_date,
        image_url: this.image_url
      });

      try {
        const response = await axios.post("http://localhost:8000/events/", {
          user_id: userId,  
          description: this.description,
          event_date: this.event_date,
          image_url: this.image_url,  
        });

        Swal.fire({
          icon: 'success',
          title: 'Evento creado con éxito',
          text: 'Tu evento se ha creado correctamente',
        });

        this.$router.push("/my-events");
      } catch (error) {
        console.error("Error al crear el evento:", error.response || error); 
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'No se pudo crear el evento, por favor intenta de nuevo.',
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
  
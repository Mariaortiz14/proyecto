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
          <label for="image_url">URL de la Imagen:</label>
          <input
            type="url"
            id="image_url"
            v-model="event.image_url"
            placeholder="https://example.com/image.jpg"
          />
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
          image_url: "",
        },
        errorMessage: null,
      };
    },
    mounted() {
      this.fetchEventDetails();
    },
    methods: {
      async fetchEventDetails() {
        const eventId = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:8000/events/${eventId}`);
          this.event = response.data; 
        } catch (error) {
          console.error("Error al cargar los detalles del evento:", error);
          Swal.fire("Error", "No se pudieron cargar los detalles del evento.", "error");
        }
      },
      async updateEvent() {
  try {
    const eventId = this.$route.params.id; 
    const response = await axios.put(`http://localhost:8000/events/${eventId}`, {
      title: this.event.title,
      description: this.event.description,
      event_date: this.event.event_date,
      image_url: this.event.image_url,
    });
    console.log("Evento actualizado:", response.data);
    Swal.fire("Éxito", "Evento actualizado correctamente.", "success");
    this.$router.push('/my-events');
  } catch (error) {
    console.error("Error al actualizar el evento:", error);
    alert("Hubo un error al actualizar el evento.");
  }
},
      cancelEdit() {
        this.$router.push("/my-events"); 
      },
    },
  };
  </script>
  
  <style>
  
  .edit-event {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h1 {
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
    height: 100px;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-save {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-save:hover {
    background-color: #0056b3;
  }
  
  .btn-cancel {
    background-color: #dc3545;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-cancel:hover {
    background-color: #b02a37;
  }
  </style>
  
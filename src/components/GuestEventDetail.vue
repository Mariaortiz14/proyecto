<template>
  <div class="guest-event-detail">
    <h1>{{ event.title }}</h1>
    <div class="event-info">
      <img :src="getImageUrl(event.image_url)" alt="Imagen del evento" class="event-image" />
      <div class="event-details">
        <p><strong>Descripción:</strong> {{ event.description }}</p>
        <p><strong>Fecha:</strong> {{ formatDate(event.event_date) }}</p>
        <p><strong>Publicado por:</strong> {{ event.user?.name || "Anónimo" }} ({{ event.user?.email || "Sin correo" }})</p>
      </div>
    </div> 

    <div class="comments-section">
      <h2>Comentarios</h2>
      <textarea v-model="newComment" placeholder="Escribe tu comentario aquí..." rows="4"></textarea>
      <button @click="addComment">Agregar comentario</button>

      <div v-if="comments.length" class="comment-list">
        <div v-for="(comment, index) in comments" :key="index" class="comment-card">
          <p><strong>{{ comment.user }}</strong></p>
          <p>{{ comment.content }}</p>
          <p class="comment-date">{{ formatDate(comment.date) }}</p>
        </div>
      </div>
      <div v-else>
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
data() {
  return {
    event: {},
    comments: [],
    newComment: "",
    defaultImage: "/static/default-event.jpg", // Imagen por defecto
  };
},
async created() {
  const eventId = this.$route.params.id;
  try {
    const response = await axios.get(`http://localhost:8000/events/${eventId}`);
    this.event = response.data;
    this.fetchComments();
  } catch (error) {
    console.error("Error al obtener el evento:", error);
  }
},
methods: {
  getImageUrl(imagePath) {
    if (!imagePath) return this.defaultImage;
    if (imagePath.startsWith("static/")) {
      return `http://localhost:8000/${imagePath}`;
    }
    return imagePath;
  },
  formatDate(date) {
    return new Date(date).toLocaleString();
  },
  async fetchComments() {
    try {
      const response = await axios.get(`http://localhost:8000/events/${this.event.id}/comments`);
      this.comments = response.data;
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  },
  async addComment() {
    if (!this.newComment.trim()) return;
    
    try {
      await axios.post(`http://localhost:8000/events/${this.event.id}/comments`, {
        content: this.newComment,
        user: "Anónimo", // Reemplazar con usuario real si está autenticado
      });

      this.comments.push({
        user: "Anónimo",
        content: this.newComment,
        date: new Date().toISOString(),
      });

      this.newComment = "";
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  },
},
};
</script>
  
  <style>
  .guest-event-detail {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .event-info {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .event-image {
    max-width: 400px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .event-details p {
    margin-bottom: 10px;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  .comment-card {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  
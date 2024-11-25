<template>
  <div class="landing-page">
    <h1>Bienvenido, {{ username }}</h1>

    <!-- Carrusel -->
    <div class="carousel">
      <div v-for="(image, index) in carouselImages" :key="index" class="carousel-item" :style="index === currentSlide ? {} : {display: 'none'}">
        <img :src="image.src" :alt="image.alt" />
        <div class="carousel-caption">{{ image.caption }}</div>
      </div>
    </div>

    <!-- Categorías -->
    <div class="categories">
      <h2>Categorías</h2>
      <div class="category-list">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <img :src="category.image" :alt="category.name" />
          <h3>{{ category.name }}</h3>
        </div>
      </div>
    </div>

    <!-- Favoritos -->
    <div class="favorites">
      <h2>¡Eventos Disponibles!</h2>
      <p class="par">Explora los ultimos eventos</p>
      <div class="favorite-list">
        <div v-for="event in favoriteEvents" :key="event.id" class="favorite-card">
          <h3>{{ event.title || "Sin título" }}</h3>
          <p>{{ event.description || "Sin descripción" }}</p>
          <p><strong>Publicado por:</strong> {{ event.user?.name || "Desconocido" }} ({{ event.user?.email || "Correo no disponible" }})</p>
          <button @click="viewEvent(event.id)">Ver más</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LandingPage",
  data() {
    return {
      username: localStorage.getItem('userName') || 'Invitado',
      currentSlide: 0,
      carouselImages: [
        {
          src: "src/assets/imagen1.jpeg",
          alt: "Imagen 1",
          caption: "Descubre eventos increíbles cerca de ti",
        },
        {
          src: "src/assets/imagen2.jpeg",
          alt: "Imagen 2",
          caption: "Explora las mejores categorías de eventos",
        },
        {
          src: "src/assets/WhatsApp Image 2024-11-23 at 2.52.46 PM.jpeg",
          alt: "Imagen 3",
          caption: "Eventos personalizados para ti",
        },
      ],
      categories: [
        { id: 1, name: "Gastronomía", image: "src/assets/comida.png" },
        { id: 2, name: "Conferencias", image: "src/assets/juegos.png" },
        { id: 3, name: "Deportes", image: "src/assets/musica.png" },
        { id: 4, name: "Festivales", image: "src/assets/cantar.png" },
        { id: 5, name: "Conciertos", image: "src/assets/baile.png" },
        { id: 6, name: "Teatro", image: "src/assets/teatro.png" },
      ],
      favoriteEvents: []  // Aquí se almacenarán los eventos favoritos obtenidos desde el backend
    };
  },
  mounted() {
    this.fetchEvents();
    setInterval(this.nextSlide, 5000); // Cambiar imagen cada 5 segundos
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get("http://localhost:8000/events", { params: { limit: 8 } });
        this.favoriteEvents = response.data; // Asignar la respuesta a `favoriteEvents`
        console.log("Eventos cargados:", this.favoriteEvents);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    },
    viewEvent(eventId) {
      this.$router.push(`/event/${eventId}`);
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
    }
  }
};
</script>

<style>
.landing-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: rgb(77,77,77);
  background: linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(140,168,255,1) 19%, rgba(189,137,254,1) 60%, rgba(252,244,244,1) 90%);
}

/* Carrusel */
.carousel {
  width: 100%;
  height: 400px; /* Ajusta la altura según sea necesario */
  position: relative;
  overflow: hidden;
}

.carousel-item {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Para que la imagen se ajuste al contenedor */
}

.carousel-caption {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
}

/* Categorías */
.categories h2 {
  font-size: 3rem;
  margin-bottom: 30px;
  color: #333;
  padding: 20px 20px;
}
.par{
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: #333;
}

.category-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.category-card {
  width: 170px;
  text-align: center;
  padding: 15px;
}

.category-card img {
  width: 60%;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;
}

.category-card h3 {
  font-size: 1.2rem;
  color: #555;
}

.category-card:hover img {
  transform: scale(1.1);
}

/* Favoritos */
.favorites h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  padding: 20px 20px;
}

.favorite-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px 20px;
  justify-content: center;
}

.favorite-card {
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px 20px;
  text-align: center;
  background: #f9f9f9;
  transition: box-shadow 0.3s ease-in-out;
}

.favorite-card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.favorite-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.favorite-card h3 {
  font-size: 1.5rem;
  color: #444;
}

.favorite-card p {
  font-size: 1rem;
  color: #666;
}

.favorite-card button {
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.favorite-card button:hover {
  background-color: #0056b3;
}
</style>



  
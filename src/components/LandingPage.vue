<template>
  <div class="landing-container">
    <section class="hero-section">
      <div class="hero-text-background">
        <div class="hero-text">
          <h2><span class="highlight">Haz lo que</span><br /><strong>te apasiona</strong></h2>
        </div>
      </div>
      <div class="hero-image-container">
        <!-- Usamos la variable heroImage para las imágenes dinámicas -->
        <img :src="heroImage" alt="Concierto" class="hero-image" />
        <div class="caption">Superorganism en Great American Music Hall</div>
      </div>
    </section>
    <div class="categories">
      <div class="category-list">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
          @click="filterByCategory(category.name)"
        >
          <img :src="category.image" :alt="category.name" />
          <h3>{{ category.name }}</h3>
        </div>
      </div>
    </div>

    <!-- Mostrar todos los eventos -->
    <div v-if="selectedCategory" class="show-all">
      <p>Mostrando eventos de la categoría: <strong>{{ selectedCategory }}</strong></p>
      <button @click="fetchEvents">Ver todos los eventos</button>
    </div>

    <!-- Eventos -->
    <div class="favorites">
      <h2>¡Eventos Disponibles!</h2>
      <div class="favorite-list">
        <div
          v-if="favoriteEvents.length"
          v-for="event in favoriteEvents"
          :key="event.id"
          class="wallet-card"
        >
          <div class="wallet-icon">
            <svg width="48" height="48" fill="#fff" viewBox="0 0 24 24">
              <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" />
            </svg>
            <div class="circle-bg"></div>
          </div>
          <h3 class="event-title">{{ event.title || "Sin título" }}</h3>
          <p class="event-description">{{ event.description || "Sin descripción" }}</p>
          <button class="wallet-button" @click="goToEventDetail(event)">Ver más</button>
        </div>

        <div v-else class="no-events">
          <p>No se encontraron eventos para esta categoría.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// Importación de imágenes para categorías
import tapas from "@/assets/tapas.gif";
import juegos from "@/assets/consola-de-videojuegos.gif";
import musica from "@/assets/carrera-de-relevos.gif";
import cantar from "@/assets/festival.gif";
import baile from "@/assets/musica.gif";
import teatro from "@/assets/musica.gif";
import conciertoHero from "@/assets/Concierto.png"; // Correcta importación para la imagen del héroe

export default {
  name: "LandingPage",
  data() {
    return {
      username: localStorage.getItem("userName") || "Invitado",
      selectedCategory: null,
      categories: [
        { id: 1, name: "Gastronomía", image: tapas },
        { id: 2, name: "Conferencias", image: juegos },
        { id: 3, name: "Deportes", image: musica },
        { id: 4, name: "Festivales", image: cantar },
        { id: 5, name: "Conciertos", image: baile },
        { id: 6, name: "Teatro", image: teatro },
      ],
      favoriteEvents: [],
      heroImage: conciertoHero, // Usar la variable heroImage para la imagen
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get("http://localhost:8000/events/", {
          params: { limit: 50 },
        });
        this.favoriteEvents = response.data;
        this.selectedCategory = null;
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    },
    async filterByCategory(categoryName) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/`, {
          params: { category: categoryName },
        });
        this.favoriteEvents = response.data;
        this.selectedCategory = categoryName;
      } catch (error) {
        console.error("Error al filtrar eventos:", error);
      }
    },
    goToEventDetail(event) {
      this.$router.push(`/guest-event/${event.id}`);
    },
  },
};
</script>

<style >
.landing-container {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 22%, rgba(44,20,37,1) 38%, rgba(44,20,37,1) 39%, rgba(199,88,165,1) 60%, rgba(255,0,125,1) 82%);
}

/* HERO SECTION */
.hero-section {
  display: flex;
  align-items: stretch;
  height: 80vh;
  margin-bottom: 40px;
  overflow: hidden;
}

.hero-text-background {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-text h2 {
  font-size: 3.5rem;
  line-height: 1.2;
  margin: 0;
}

.highlight {
  color: #e95441;
  font-weight: bold;
}

.hero-image-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 5px;
}
h1{
  color:#fff
}

/* CATEGORÍAS */
.categories h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  padding: 10px 20px;
}

.category-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-card {
  width: 160px;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.2s ease;
  
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.category-card:hover {
  transform: scale(1.05);
}

.category-card img {
  width: 70%;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;
}

.category-card h3 {
  font-size: 1.1rem;
  color: #444;
}

/* EVENTOS */
.favorites h2 {
  font-size: 2rem;
  color: #fffefe;
  padding: 20px;
  text-align: center;
}

.par {
  font-size: 1.2rem;
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
}

.favorite-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

/* TARJETAS ESTILO WALLET */
.wallet-card {
  background: rgb(240, 234, 234);
  border-radius: 1rem;
  padding: 2rem 1rem;
  width: 260px;
  margin: 1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.wallet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.wallet-icon {
  position: relative;
  margin-bottom: 1rem;
}

.wallet-icon svg {
  position: relative;
  z-index: 2;
}

.circle-bg {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #d3b9f3;
  border-radius: 50%;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.event-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-description {
  font-size: 0.95rem;
  color: #555;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wallet-button {
  margin-top: 1rem;
  background: linear-gradient(90deg, #b620e0, #7c26f8);
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.wallet-button:hover {
  background: linear-gradient(90deg, #7c26f8, #b620e0);
}

/* OTROS */
.show-all {
  text-align: center;
  margin: 2rem 0;
}

.no-events {
  font-size: 1rem;
  color: #777;
  text-align: center;
  margin-top: 2rem;
}
</style>




  
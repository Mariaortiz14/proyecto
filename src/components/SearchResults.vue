<template>
    <div class="search-results">
      <h2>Resultados para "{{ query }}"</h2>
  
      <div v-if="loading" class="loader-container">
        <div class="spinner"></div>
        <p>Cargando eventos...</p>
      </div>
  
      <div v-else>
        <div v-if="filteredEvents.length === 0">
          <p>No se encontraron eventos para esta búsqueda.</p>
        </div>
  
        <div class="event-list">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="event-card"
          >
            <h3>{{ event.title || "Sin título" }}</h3>
            <p>{{ event.description || "Sin descripción" }}</p>
            <p><strong>Categoría:</strong> {{ event.category || "Sin categoría" }}</p>
            <p><strong>Publicado por:</strong> {{ event.user?.name || "Anónimo" }}</p>
            <button @click="goToEventDetail(event.id)">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SearchResults',
    data() {
      return {
        query: this.$route.query.query || '',
        allEvents: [],
        filteredEvents: [],
        loading: true,
      };
    },
    watch: {
      '$route.query.query'(newQuery) {
        this.query = newQuery;
        this.filterEvents();
      },
    },
    mounted() {
      this.fetchEvents();
    },
    methods: {
      async fetchEvents() {
        try {
          this.loading = true;
          const response = await axios.get('http://localhost:8000/events');
          this.allEvents = response.data;
          this.filterEvents();
        } catch (error) {
          console.error('Error al obtener eventos:', error);
        } finally {
          this.loading = false;
        }
      },
      filterEvents() {
        const q = this.query.toLowerCase();
        this.filteredEvents = this.allEvents.filter((event) => {
          return (
            event.title?.toLowerCase().includes(q) ||
            event.description?.toLowerCase().includes(q) ||
            event.category?.toLowerCase().includes(q)
          );
        });
      },
      goToEventDetail(id) {
        this.$router.push(`/guest-event/${id}`);
      },
    },
  };
  </script>
  
  <style>
  .event-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
  }
  .category-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.category-card:hover {
  transform: scale(1.05);
}

  
  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
  
  .spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #2c3e50;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 0.9s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  
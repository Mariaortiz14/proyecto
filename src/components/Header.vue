<template>
  <header class="main-header">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo-container">
        <router-link to="/landingPage">
          <img src="C:\Users\maria\OneDrive\Desktop\gestion\proyecto\src\assets\image.png" alt="Happenit Logo" class="logo" />
        </router-link>
      </div>

      <!-- Buscador -->
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar eventos..."
          @input="emitSearch"
        />
        <i class="fas fa-map-marker-alt location-icon"></i>
        <span class="location-label">Bogotá</span>
        <button class="search-btn" @click="emitSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Enlaces de navegación -->
      <nav class="nav-links">
        <ul>
          <li><router-link to="/landingPage">Inicio</router-link></li>
          <li><router-link to="/edit-profile">Ver Perfil</router-link></li>
          <li><router-link to="/my-events">Mis Eventos</router-link></li>
          <li><router-link to="/calendar">Calendario</router-link></li>
          <li><router-link to="/pqr">PQR</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Iniciar sesión</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Registrarse</router-link></li>
          <li v-if="isLoggedIn"><a @click="logout">Cerrar sesión</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      searchQuery: ''
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/landingPage');
    },
    emitSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style>
.main-header {
  background-color: #121212;
  width: 100%;
  padding: 16px 40px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.logo-container .logo {
  height: 80px;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 9999px;
  padding: 8px 16px;
  flex: 1;
  max-width: 600px;
  min-width: 300px;
  color: white;
}

.search-container input {
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  color: white;
  margin: 0 8px;
  font-size: 14px;
}

.search-container .search-icon,
.search-container .location-icon {
  color: #ccc;
}

.search-container .location-label {
  color: #ccc;
  font-size: 13px;
  margin-left: 4px;
}

.search-btn {
  background-color: #e74c3c;
  border: none;
  border-radius: 50%;
  padding: 6px;
  color: white;
  cursor: pointer;
  margin-left: 8px;
}

.nav-links ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #e74c3c;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-container {
    width: 100%;
    margin-top: 12px;
  }

  .nav-links ul {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>

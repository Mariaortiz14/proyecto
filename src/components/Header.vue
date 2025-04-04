<template> 
  <header>
    <div class="header-content">
      <img
        src="C:\Nur_Derly\gestion\proyecto\src\assets\Lootipo-Happenit-2.0.png"
        alt="Happenit Logo"
        class="logo"
      />
      <nav>
        <ul>
          <li v-if="isLoggedIn"><router-link to="/landingPage">Inicio</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/edit-profile">Ver perfil</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/my-events">Mis Eventos</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/calendar">Calendario</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Iniciar sesión</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Registrarse</router-link></li>
          <li v-if="isLoggedIn"><a @click="logout">Cerrar sesión</a></li>
        </ul>
      </nav>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Buscar eventos..." />
        <button @click="searchEvents">Buscar</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      searchQuery: '',
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login'); 
    },
    searchEvents() {
      console.log('Buscar eventos:', this.searchQuery);
    }
  },
};
</script>

<style>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 22%, rgba(44,20,37,1) 38%, rgba(44,20,37,1) 39%, rgba(199,88,165,1) 60%, rgba(255,0,125,1) 82%);
  color: white;
  width: 100%;
  box-sizing: border-box;
}

.logo {
  width: 100px;
  flex-shrink: 0; 
}

nav ul {
  display: flex;
  gap: 20px; 
  list-style: none;
  padding: 0;
  margin: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold; 
}

nav a:hover {
  text-decoration: underline;
}

.search-bar {
  display: flex;
  align-items: center;
  flex-shrink: 0; 
}

.search-bar input {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px 0 0 5px; 
  border: 1px solid #ccc;
  width: 250px; 
  box-sizing: border-box; 
}

.search-bar button {
  padding: 10px 20px;
  background-color: #a828d2;
  color: white;
  border: none;
  border-radius: 5px 5px 5px 0;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box; 
}

.search-bar button:hover {
  background-color: #0056b3;
}
</style>
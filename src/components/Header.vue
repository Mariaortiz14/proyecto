<template> 
  <header>
    <div class="header-content">
      <img
        src="C:/Nur_Derly/gestion/proyecto/src/assets/logo-happenit.jpeg"
        alt="Happenit Logo"
        class="logo"
      />
      <nav>
        <ul>
          <li><router-link to="/landingPage">Inicio</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/edit-profile">Ver perfil</router-link></li>
          <li><router-link to="/my-events">Mis Eventos</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/calendar">Calendario</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Iniciar sesión</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Registrarse</router-link></li>
          <li v-if="isLoggedIn"><a @click="logout">Cerrar sesión</a></li>
        </ul>
      </nav>
      <!-- Barra de búsqueda -->
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
    // Comprobar el estado de inicio de sesión al cargar el componente
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // Verifica si el token existe en localStorage
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
    },
    logout() {
      // Eliminar el token de localStorage y actualizar el estado
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');  // Redirigir al usuario al login después de cerrar sesión
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
  background: rgb(255,255,255);
  background: linear-gradient(90deg, rgba(255,255,255,1) 10%, rgba(237,165,255,1) 29%, rgba(255,111,211,1) 52%, rgba(255,20,135,1) 71%, rgba(187,170,255,1) 93%);
  color: white;
  width: 100%;
  box-sizing: border-box; /* Asegurar que los elementos no se desborden */
}

.logo {
  width: 100px; /* Tamaño más grande del logo */
  flex-shrink: 0; /* Evitar que el logo se reduzca si hay poco espacio */
}

nav ul {
  display: flex;
  gap: 20px; /* Espaciado entre los enlaces */
  list-style: none;
  padding: 0;
  margin: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px; /* Tamaño de fuente más grande */
  font-weight: bold; /* Resaltar más los textos */
}

nav a:hover {
  text-decoration: underline;
}

.search-bar {
  display: flex;
  align-items: center;
  flex-shrink: 0; /* Evitar que la barra se reduzca */
}

.search-bar input {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px 0 0 5px; /* Esquinas redondeadas solo a la izquierda */
  border: 1px solid #ccc;
  width: 250px; /* Tamaño ajustado */
  box-sizing: border-box; /* Incluir padding en el ancho */
}

.search-bar button {
  padding: 10px 20px;
  background-color: #a828d2;
  color: white;
  border: none;
  border-radius: 5px 5px 5px 0; /* Esquinas redondeadas solo a la derecha */
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box; /* Evitar desbordes */
}

.search-bar button:hover {
  background-color: #0056b3;
}
</style>
<template>
  <div>
    <Header 
      :isLoggedIn="isLoggedIn" 
      @logout="handleLogout" 
    />
    <router-view @loginSuccess="handleLogin" />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  data() {
    return {
      isLoggedIn: false // Estado inicial
    };
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true; // Cambia el estado cuando inicie sesión
    },
    handleLogout() {
      this.isLoggedIn = false; // Cambia el estado cuando cierre sesión
      this.$router.push('/login'); // Redirige al login
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>


<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1; /* Ocupa el espacio entre el Header y Footer */
  padding: 20px;
}

/* Puedes ajustar estos estilos si necesitas un diseño más personalizado */
</style>
<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
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
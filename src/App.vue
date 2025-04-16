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
      isLoggedIn: false 
    };
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true; 
    },
    handleLogout() {
      this.isLoggedIn = false; 
      this.$router.push('/login');
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
  flex: 1; 
  padding: 20px;
}

</style>
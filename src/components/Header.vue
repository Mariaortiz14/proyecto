<template>
  <header>
    <div class="header-content">
      <img src="C:\Nur_Derly\gestion\proyecto\src\assets\logo-happenit.jpeg" alt="Happenit Logo" class="logo" />
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/edit-profile">ver perfil</router-link></li>
          <li><router-link to="/events">Eventos</router-link></li>
          <li><router-link to="/login">Iniciar sesión</router-link></li>
          <li><router-link to="/regiter">Registrarse</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgb(255,255,255);
  background: linear-gradient(90deg, rgba(255,255,255,1) 25%, rgba(0,1,4,1) 73%, rgba(0,0,0,1) 100%);
  color: white;
}

.logo {
  width: 100px;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

nav a:hover {
  text-decoration: underline;
}
</style>

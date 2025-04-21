<template>
  <div class="login-container">
    <div class="image-side">
      <img :src="fondoLogin" alt="Login Image" class="login-image" />
    </div>

    <div class="form-side">
      <form class="form">
        <p id="heading">Acceso</p>

        <div class="field">
          <i class="fas fa-user input-icon"></i>
          <input
            v-model="username"
            type="text"
            class="input-field"
            placeholder="Nombre de usuario"
          />
        </div>

        <div class="field">
          <i class="fas fa-lock input-icon"></i>
          <input
            v-model="password"
            type="password"
            class="input-field"
            placeholder="Contraseña"
          />
        </div>

        <div class="btn">
          <button class="button1" @click.prevent="loginUser">Acceso</button>
          <button class="button2" type="button">Inscribirse</button>
        </div>
        <button class="button3" type="button">¿Olvidaste tu contraseña?</button>

        <p v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import fondoLogin from '@/assets/fondo_login.jpg'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      fondoLogin
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/login`,
          {
            username: this.username,
            password: this.password
          }
        )

        if (response.data.message === 'Inicio de sesión exitoso') {
          const { user_id, name, token } = response.data

          localStorage.setItem('user_id', user_id)
          localStorage.setItem('userName', name)
          localStorage.setItem('token', token)

          const userStore = useUserStore()
          userStore.login(name, token)

          this.$router.push('/landingPage')
        }
      } catch (error) {
        this.errorMessage = 'Usuario o contraseña incorrectos'
      }
    }
  }
}
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

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
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
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
.login-container {
  display: flex;
  height: 100vh;
  background-color: #212121;
}

.image-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Aquí van los estilos que me compartiste */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 0.4em;
  background-color: #171717;
  border-radius: 25px;
  transition: 0.4s ease-in-out;
}
.form:hover {
  transform: scale(1.05);
  border: 1px solid black;
}
#heading {
  text-align: center;
  margin: 2em;
  color: rgb(255, 255, 255);
  font-size: 1.2em;
}
.field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  border-radius: 25px;
  padding: 0.6em;
  border: none;
  outline: none;
  color: white;
  background-color: #171717;
  box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
}
.input-icon {
  height: 1.3em;
  width: 1.3em;
  fill: white;
}
.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
}
.form .btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2.5em;
}
.button1 {
  padding: 0.5em 1.1em;
  border-radius: 5px;
  margin-right: 0.5em;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;
}
.button1:hover {
  background-color: black;
  color: white;
}
.button2 {
  padding: 0.5em 2.3em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;
}
.button2:hover {
  background-color: black;
  color: white;
}
.button3 {
  margin-bottom: 3em;
  padding: 0.5em;
  border-radius: 5px;
  border: none;
  outline: none;
  transition: 0.4s ease-in-out;
  background-color: #252525;
  color: white;
}
.button3:hover {
  background-color: red;
  color: white;
}
</style>
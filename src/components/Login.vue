<template>
  <div class="login">
    <div class="form-container">
      <div class="login-header">
        <h1>Iniciar Sesión</h1>
      </div>
      <form @submit.prevent="loginUser" class="login-form">
        <input
          v-model="username"
          type="text"
          placeholder="Correo electrónico"
          class="input-field"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="input-field"
          required
        />
        <button type="submit" class="submit-button">Iniciar Sesión</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <div class="register-link">
        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:8000/login/', {
          username: this.username,
          password: this.password
        });

        if (response.data.message === 'Inicio de sesión exitoso') {
          localStorage.setItem('userName', this.username); // Guardar el nombre en localStorage
          this.$router.push('/home'); // Redirigir a Home
        }
      } catch (error) {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('src/assets/WhatsApp Image 2024-10-21 at 9.27.20 PM.jpeg') no-repeat center center;
  background-size: cover;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.login-header h1 {
  color: white;
  font-size: 2rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.form-container {
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.password-container {
  position: relative;
}

.submit-button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 15px;
  font-weight: bold;
}

.register-link {
  margin-top: 20px;
  font-size: 0.9rem;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>

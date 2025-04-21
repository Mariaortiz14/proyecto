<template>
  <div class="login-container">
    <div class="form-side">
      <div class="form">
        <h2 id="heading">Registro</h2>
        <form @submit.prevent="registerUser" class="register-form">
          <div class="field">
            <input v-model="registerForm.name" type="text" placeholder="Nombre" required class="input-field" />
          </div>
          <div class="field">
            <input v-model="registerForm.surname" type="text" placeholder="Apellido" class="input-field" />
          </div>
          <div class="field">
            <input v-model="registerForm.phone" type="text" placeholder="Teléfono" required class="input-field" />
          </div>
          <div class="field">
            <input v-model="registerForm.email" type="email" placeholder="Email" required class="input-field" />
          </div>

          <div class="field password-container">
            <input
              v-model="registerForm.password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Contraseña"
              required
              class="input-field"
            />
            <button type="button" @click="togglePasswordVisibility" class="eye-button">
              <span v-if="passwordVisible">🙈</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>

          <div class="field password-container">
            <input
              v-model="registerForm.confirm_password"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              placeholder="Repite tu contraseña"
              required
              class="input-field"
            />
            <button type="button" @click="toggleConfirmPasswordVisibility" class="eye-button">
              <span v-if="confirmPasswordVisible">🙈</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>

          <div class="btn">
            <button type="submit" class="button2">Registrarse</button>
          </div>
        </form>
        <p style="color: white; text-align: center">
          ¿Ya tienes cuenta?
          <router-link to="/Login" style="color: #64b5f6">Iniciar Sesión</router-link>
        </p>
        <p v-if="errorMessage" class="error" style="color: red; text-align: center">{{ errorMessage }}</p>
      </div>
    </div>

    <div class="image-side">
      <img src="@/assets/fondo_login.jpg" alt="Imagen de registro" class="login-image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      registerForm: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      passwordVisible: false,
      confirmPasswordVisible: false,
      errorMessage: ''
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    async registerUser() {
      try {
        if (this.registerForm.password !== this.registerForm.confirm_password) {
          this.errorMessage = "Las contraseñas no coinciden.";
          return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/`, this.registerForm);
        Swal.fire('Éxito', 'Registro exitoso', 'success');
      
        this.$router.push('/Login');
      } catch (error) {
        this.errorMessage = error.response?.data?.detail || "Error al registrarse.";
        Swal.fire('Error', this.errorMessage, 'error');
      }
    }
  }
};
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

/* Estilos compartidos */
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
  font-size: 1.5em;
}
input {
  margin-bottom: 1rem; /* o lo que se vea bien */
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
.input-field {
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #d3d3d3;
}
.btn {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2em;
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
.eye-button {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}
.password-container {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5em;
}
</style>
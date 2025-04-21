<template>
  <div class="editprofile-fondo">
    <div class="editprofile-wrapper">
      <h1>Editar Perfil</h1>

      <form @submit.prevent="confirmAndSubmit">
        <section class="editprofile-section">
          <h2>Información Personal</h2>

          <!-- Input de nombre -->
          <div class="editprofile-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" v-model="profile.name" />
          </div>

          <!-- Input de apellido -->
          <div class="editprofile-group">
            <label for="surname">Apellido</label>
            <input type="text" id="surname" v-model="profile.surname" />
          </div>

          <!-- Input de correo electrónico -->
          <div class="editprofile-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="profile.email" />
          </div>

          <!-- Input de teléfono -->
          <div class="editprofile-group">
            <label for="phone">Teléfono</label>
            <input type="text" id="phone" v-model="profile.phone" />
          </div>
        </section>

        <!-- Botones de guardar y cancelar -->
        <div class="editprofile-actions">
          <button type="submit" class="editprofile-btn-primary">Guardar Cambios</button>
          <button type="button" class="editprofile-btn-secondary" @click="resetForm">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "EditProfile",
  data() {
    return {
      profile: {
        name: "",
        surname: "",
        email: "",
        phone: ""
      }
    };
  },
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    // Cargar la información del perfil del usuario desde la API
    async loadUserProfile() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        Swal.fire("Error", "Usuario no autenticado.", "error");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          this.profile.name = data.firstName || "";
          this.profile.surname = data.lastName || "";
          this.profile.email = data.email || "";
          this.profile.phone = data.phone || "";
        } else {
          Swal.fire("Error", "No se pudo cargar el perfil del usuario.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un problema al conectar con el servidor.", "error");
      }
    },

    // Confirmar la edición del perfil y pedir la contraseña del usuario
    async confirmAndSubmit() {
      // Validación de campos vacíos
      if (
        !this.profile.name.trim() &&
        !this.profile.surname.trim() &&
        !this.profile.email.trim() &&
        !this.profile.phone.trim()
      ) {
        Swal.fire("Advertencia", "Debes llenar al menos un campo antes de continuar.", "warning");
        return;
      }

      // Solicitar contraseña actual para confirmar los cambios
      const { value: password } = await Swal.fire({
        title: "Confirmación de cambios",
        text: "Ingresa tu contraseña actual para confirmar los cambios",
        input: "password",
        inputLabel: "Contraseña actual",
        inputPlaceholder: "Escribe tu contraseña",
        inputAttributes: {
          maxlength: 100,
          autocapitalize: "off",
          autocorrect: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      });

      if (!password) {
        Swal.fire("Cancelado", "No se realizaron cambios.", "info");
        return;
      }

      this.submitForm(password);
    },

    // Enviar los cambios del perfil al servidor
    async submitForm(currentPassword) {
      const userId = localStorage.getItem("user_id");

      const payload = {
        name: this.profile.name,
        surname: this.profile.surname,
        email: this.profile.email,
        phone: this.profile.phone,
        currentPassword: currentPassword
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        if (response.ok) {
          Swal.fire("Éxito", "Perfil actualizado correctamente.", "success");
          this.loadUserProfile();
        } else {
          Swal.fire("Error", responseData.detail || "No se pudo actualizar el perfil.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un problema al conectar con el servidor.", "error");
      }
    },

    // Resetear el formulario con los valores actuales del perfil
    resetForm() {
      this.loadUserProfile();
    }
  }
};
</script>


<style>
.editprofile-fondo {
  background: radial-gradient(circle at center, #1f1f1f 0%, #000000 100%);
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.editprofile-wrapper {
  max-width: 600px;
  width: 100%;
  background: linear-gradient(135deg, #ffbc00, #ff0058);
  padding: 20px;
  border-radius: 1.5em;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  color: #fff;
  transition: transform 0.3s ease;
}

.editprofile-wrapper:hover {
  transform: translateY(-10px);
}

.editprofile-section {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 1em;
  margin-bottom: 20px;
}

.editprofile-section h2 {
  margin-bottom: 15px;
  color: #fffbe7;
}

.editprofile-group {
  margin-bottom: 15px;
}

.editprofile-group label {
  display: block;
  margin-bottom: 6px;
  color: #ffd;
  font-weight: 500;
}

.editprofile-group input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #222;
  color: #fff;
  font-size: 1rem;
}

.editprofile-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.editprofile-btn-primary,
.editprofile-btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.editprofile-btn-primary {
  background-color: #ff0058;
  color: white;
}

.editprofile-btn-primary:hover {
  background-color: #e6004e;
}

.editprofile-btn-secondary {
  background-color: #555;
  color: white;
}

.editprofile-btn-secondary:hover {
  background-color: #444;
}

</style>

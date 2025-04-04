<template>
  <div class="fondo">
    <div class="edit-profile">
      <h1>Editar Perfil</h1>

      <div class="profile-image">
        <img :src="imageUrl || defaultProfileImage" alt="Foto de perfil" width="100" />
        <label for="profile-image" class="upload-label">Cambiar Foto</label>
        <input
          type="file"
          id="profile-image"
          @change="handleImageUpload"
          accept="image/*"
          hidden
        />
      </div>

      <form @submit.prevent="submitForm">
        <section class="section">
          <h2>Información Personal</h2>
          <div class="form-group">
            <label for="first-name">Nombre</label>
            <input type="text" id="first-name" v-model="profile.firstName" required />
          </div>
          <div class="form-group">
            <label for="last-name">Apellido</label>
            <input type="text" id="last-name" v-model="profile.lastName" required />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="profile.email" required />
          </div>
        </section>

        <section class="section">
          <h2>Cambiar Contraseña</h2>
          <div class="form-group">
            <label for="current-password">Contraseña Actual</label>
            <input type="password" id="current-password" v-model="profile.currentPassword" />
          </div>
          <div class="form-group">
            <label for="new-password">Nueva Contraseña</label>
            <input type="password" id="new-password" v-model="profile.newPassword" />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirmar Contraseña</label>
            <input type="password" id="confirm-password" v-model="profile.confirmPassword" />
          </div>
        </section>

        <div class="actions">
          <button type="submit" class="btn-primary">Guardar Cambios</button>
          <button type="button" class="btn-secondary" @click="resetForm">Cancelar</button>
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
        firstName: "",
        lastName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        image: null,
      },
      imageUrl: null,
      defaultProfileImage: "C:/Nur_Derly/gestion/proyecto/src/assets/perfil-por-defecto.png",
    };
  },
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        Swal.fire("Error", "Usuario no autenticado.", "error");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          this.profile.firstName = data.firstName || "";
          this.profile.lastName = data.lastName || "";
          this.profile.email = data.email || "";
          this.imageUrl = data.image || this.defaultProfileImage;
        } else {
          Swal.fire("Error", "No se pudo cargar el perfil del usuario.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un problema al conectar con el servidor.", "error");
      }
    },
    async submitForm() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        Swal.fire("Error", "Usuario no autenticado.", "error");
        return;
      }

      if (this.profile.newPassword && this.profile.newPassword !== this.profile.confirmPassword) {
        Swal.fire("Error", "Las contraseñas no coinciden.", "error");
        return;
      }

      const formData = new FormData();
      formData.append("firstName", this.profile.firstName);
      formData.append("lastName", this.profile.lastName);
      formData.append("email", this.profile.email);

      if (this.profile.currentPassword && this.profile.newPassword) {
        formData.append("currentPassword", this.profile.currentPassword);
        formData.append("newPassword", this.profile.newPassword);
      }

      if (this.profile.image) {
        formData.append("file", this.profile.image);
      }

      try {
        const response = await fetch(`http://localhost:8000/users/${userId}/profile`, {
          method: "PUT",
          body: formData,
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
    resetForm() {
      this.loadUserProfile();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file); // Crea la vista previa
        console.log("Vista previa generada:", this.imageUrl);

      }
    },
  },
};
</script>
<style>
.fondo {
  background: linear-gradient(0deg, #4d4d4d 0%, #8ca8ff 19%, #bd89fe 60%, #fcf4f4 90%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-profile {
  max-width: 800px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.profile-image {
  text-align: center;
  margin-bottom: 20px;
  flex: 1 1 150px;
}

.profile-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #8ca8ff;
}

.upload-label {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
}

.upload-label:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2.5em;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  width: 100%;
}

h2 {
  font-size: 1.5em;
  color: #555;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 15px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 5px;
  transition: all 0.3s ease-in-out;
}

input:focus {
  border-color: #8ca8ff;
  box-shadow: 0 0 8px rgba(140, 168, 255, 0.6);
  outline: none;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 30px;
}

.btn-primary {
  background-color: #a828d2;
  color: white;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  font-size: 1em;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.profile-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.profile-info .form-group {
  flex: 1 1 45%; 
  margin-right: 30px;
  margin-bottom: 20px;
}

.profile-info .form-group:last-child {
  margin-right: 0;
}

.profile-info .form-group input {
  padding: 15px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .profile-info .form-group {
    flex: 1 1 100%; 
    margin-right: 0;
  }

  .edit-profile {
    padding: 20px;
    gap: 20px;
  }

  .profile-image img {
    width: 120px;
    height: 120px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>

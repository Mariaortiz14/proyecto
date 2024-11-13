<template>
    <div class="profile-edit">
      <header class="profile-header">
        <h1>Editar Perfil</h1>
        <p>Bienvenida, Sara. Aquí puedes actualizar tu información de perfil.</p>
      </header>
  
      <form @submit.prevent="submitProfile" class="profile-form">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="profile.name" required />
        </div>
  
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="profile.email" required />
        </div>
  
        <div class="form-group">
          <label for="phone">Teléfono:</label>
          <input type="text" id="phone" v-model="profile.phone" required />
        </div>
  
        <div class="form-group">
          <label for="image">Foto de Perfil:</label>
          <input type="file" @change="onFileChange" />
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Vista previa de imagen" class="profile-image" />
          </div>
          <div v-else class="image-preview">
            <img src="C:\Nur_Derly\gestion\proyecto\src\assets\perfil-por-defecto.png" alt="Imagen de perfil" class="profile-image" />
          </div>
        </div>
  
        <button type="submit" class="save-button">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "ProfileEdit",
    data() {
      return {
        profile: {
          name: "Sara",
          email: "sara@example.com",
          phone: "123-456-7890",
          image: null,
        },
        previewImage: null,
      };
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.profile.image = file;
  
          // Crear una vista previa de la imagen
          const reader = new FileReader();
          reader.onload = e => {
            this.previewImage = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitProfile() {
        console.log("Información del perfil enviada:", this.profile);
        alert("Perfil actualizado exitosamente.");
  
      
      },
    },
  };
  </script>
  
  <style>
  .profile-edit {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input[type="file"] {
    margin-top: 10px;
  }
  
  .image-preview {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%; 
    object-fit: cover; 
    border: 3px solid #ccc; 
  }
  
  .save-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: #45a049;
  }
  </style>
  
  
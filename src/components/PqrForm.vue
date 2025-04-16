<template>
  <div class="fondo">
    <div class="pqr-form">
      <div class="section">
        <h2>Formulario de PQR</h2>

        <div class="form-group">
          <label for="tipo">Tipo de PQR:</label>
          <select id="tipo" v-model="pqr.type">
            <option disabled value="">Selecciona una opción</option>
            <option>Petición</option>
            <option>Queja</option>
            <option>Reclamo</option>
          </select>
        </div>

        <div class="form-group">
          <label for="asunto">Asunto:</label>
          <input type="text" id="asunto" v-model="pqr.subject" />
        </div>

        <div class="form-group">
          <label for="mensaje">Mensaje:</label>
          <textarea id="mensaje" v-model="pqr.message"></textarea>
        </div>

        <div class="actions">
          <button class="btn-primary" @click="submitPqr" :disabled="loading">
            <span v-if="loading" class="loader"></span>
            <span v-else>Enviar PQR</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "PqrForm",
  data() {
    return {
      pqr: {
        type: "",
        subject: "",
        message: ""
      },
      loading: false
    };
  },
  methods: {
    async submitPqr() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        Swal.fire("Error", "Debes iniciar sesión para enviar un PQR.", "error");
        return;
      }

      if (!this.pqr.type || !this.pqr.subject || !this.pqr.message) {
        Swal.fire({
          icon: "warning",
          title: "Campos incompletos",
          text: "Por favor, completa todos los campos del formulario."
        });
        return;
      }

      this.loading = true;

      try {
        const response = await fetch("http://localhost:8000/pqr/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: parseInt(userId),
            type: this.pqr.type,
            subject: this.pqr.subject,
            message: this.pqr.message
          })
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("¡Enviado!", "Tu PQR ha sido registrado correctamente.", "success");
          this.resetForm();
        } else {
          Swal.fire("Error", data.detail || "No se pudo enviar el PQR.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un error al enviar el formulario.", "error");
        console.error("Error en submitPqr:", error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.pqr.type = "";
      this.pqr.subject = "";
      this.pqr.message = "";
    }
  }
};
</script>

<style>
.fondo {
  background: radial-gradient(circle at center, #1f1f1f 0%, #000000 100%);
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.pqr-form {
  max-width: 600px;
  width: 100%;
  background: linear-gradient(135deg, #ffbc00, #ff0058);
  padding: 20px;
  border-radius: 1.5em;
  box-shadow: 0 0 30px rgba(255, 0, 88, 0.4);
  color: #fff;
  transition: transform 0.3s ease;
}

.pqr-form:hover {
  transform: translateY(-10px);
}

.section {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 1em;
  margin-bottom: 20px;
}

.section h2 {
  margin-bottom: 15px;
  color: #fffbe7;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #ffd;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #222;
  color: #fff;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: #ff0058;
  color: white;
  min-width: 140px;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary:hover:enabled {
  background-color: #e6004e;
}

.loader {
  border: 3px solid #fff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<template>
  <div class="comments-section">
    <h2>Comentarios</h2>

    <div v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>{{ comment.user.name }} {{ comment.user.surname }}</strong>
          <div class="comment-actions">
            <button v-if="comment.user.id == currentUserId" @click="editComment(comment)">✏️</button>
            <button v-if="comment.user.id == currentUserId" @click="deleteComment(comment.id)">🗑️</button>
          </div>
        </div>
        <p class="comment-text">{{ comment.content }}</p>
        <p class="comment-date">{{ formatDate(comment.created_at) }}</p>
      </div>
    </div>
    <div v-else>
      <p>No hay comentarios todavía.</p>
    </div>

    <div v-if="canComment" class="add-comment">
      <textarea v-model="newComment" placeholder="Escribe un comentario..."></textarea>
      <button @click="submitComment">Enviar</button>
    </div>
    <div v-else class="comment-disabled">
      <p>No puedes comentar en tu propio evento.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Comments',
  props: {
    eventId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      newComment: '',
      currentUserId: parseInt(localStorage.getItem('user_id')),
      eventOwnerId: null
    }
  },
  computed: {
    canComment() {
      return this.eventOwnerId && this.currentUserId && this.currentUserId != this.eventOwnerId
    }
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/event/${this.eventId}`)
        this.comments = response.data
      } catch (error) {
        console.error('Error al cargar los comentarios:', error)
      }
    },
    async fetchEventOwner() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${this.eventId}`)
        this.eventOwnerId = response.data.user.id
      } catch (error) {
        console.error('Error al obtener el propietario del evento:', error)
      }
    },
    async submitComment() {
      if (!this.newComment.trim()) {
        return Swal.fire('Oops', 'El comentario no puede estar vacío.', 'warning');
      }

      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `${import.meta.env.VITE_API_URL}/comments/`,
          {
            event_id: this.eventId,
            content: this.newComment
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        Swal.fire('¡Comentario enviado!', '', 'success');
        this.newComment = '';
        this.fetchComments();
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
        Swal.fire('Error', 'No se pudo enviar el comentario.', 'error');
      }
    },
    async deleteComment(commentId) {
      const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esto eliminará el comentario de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e6004e',
        cancelButtonColor: '#444',
        confirmButtonText: 'Sí, eliminar'
      })

      if (confirm.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.fetchComments();
          Swal.fire('Eliminado', 'Comentario eliminado correctamente.', 'success');
        } catch (error) {
          console.error('Error al eliminar el comentario:', error);
          Swal.fire('Error', 'No se pudo eliminar el comentario.', 'error');
        }
      }
    },
    editComment(comment) {
      Swal.fire({
        title: 'Editar comentario',
        input: 'textarea',
        inputValue: comment.content,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: async (newContent) => {
          if (!newContent.trim()) return Swal.showValidationMessage('El comentario no puede estar vacío')
          try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/comments/${comment.id}`, {
              content: newContent
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            this.fetchComments();
            Swal.fire('Actualizado', 'Comentario editado correctamente', 'success');
          } catch (error) {
            console.error('Error al editar el comentario:', error);
            Swal.fire('Error', 'No se pudo editar el comentario.', 'error');
          }
        }
      });
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString('es-ES')
    }
  },
  mounted() {
    this.fetchEventOwner()
    this.fetchComments()
  }
}
</script>

<style>
.comments-section {
  margin-top: 20px;
  color: #eee;
  padding: 20px;
  border-top: 1px solid #333;
}

.comment {
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 10px;
  position: relative;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-actions button {
  background: transparent;
  border: none;
  color: #ff0058;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 10px;
}

.comment-actions button:hover {
  color: #fff;
}

.comment-user {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment-text {
  margin: 5px 0;
}

.comment-date {
  font-size: 0.8em;
  color: #aaa;
}

.add-comment {
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  min-height: 80px;
  background-color: #111;
  color: #eee;
  border: 1px solid #444;
  border-radius: 8px;
  resize: vertical;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #ff0058;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e6004e;
}

.comment-disabled {
  margin-top: 20px;
  color: #888;
  font-style: italic;
}
</style>

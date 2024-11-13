<template>
  <div class="calendar-page">
    <header class="calendar-header">
      <h1>Bienvenida, Sara</h1>
      <p>Aquí está tu calendario:</p>
    </header>

    <main class="calendar-container">
      <!-- Componente de Vue Cal -->
      <vue-cal class="vuecal" :time="false" default-view="month" />
    </main>
  </div>
</template>

<script>
// Importar el componente de Vue Cal
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css' // Importar los estilos

export default {
  name: 'CalendarView',
  components: {
    VueCal
  }
};
</script>

<style scoped>
.calendar-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.calendar-header {
  text-align: center;
  margin-bottom: 20px;
}

.calendar-container {
  max-width: 900px;
  margin: 0 auto;
}

.vuecal {
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>

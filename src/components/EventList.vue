<template>
  <section>
    <h2>Próximos Eventos</h2>
    <ul v-if="events.length">
      <li v-for="event in events" :key="event.id" class="event-item">
        <h3>{{ event.name }}</h3>
        <p>{{ event.description }}</p>
        <p><strong>Fecha:</strong> {{ new Date(event.date).toLocaleDateString() }}</p>
        <p><strong>Ubicación:</strong> {{ event.location }}</p>
      </li>
    </ul>
    <p v-else>No hay eventos disponibles en este momento.</p>
  </section>
</template>

<script>
export default {
  name: 'EventList',
  props: {
    events: Array
  }
};
</script>

<style>
.event-item {
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #ccc;
}

h2 {
  color: #555;
  font-size: 1.5em;
}

h3 {
  font-size: 1.3em;
  color: #444;
}

p {
  color: #666;
  margin: 5px 0;
}
</style>

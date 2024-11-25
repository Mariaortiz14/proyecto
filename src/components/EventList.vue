<template>
  <div class="event-list">
    <div v-if="events.length > 0">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h2>{{ event.name }}</h2>
        <p>{{ event.description }}</p>
        <p><strong>{{ event.date }}</strong></p>
      </div>
    </div>
    <p v-else>No hay eventos disponibles en este momento.</p>
  </div>
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
.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.event-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  background-color: #f9f9f9;
}

h2 {
  color: #333;
}

p {
  color: #555;
}
</style>

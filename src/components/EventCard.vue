<template>
  <div class="event-card" @click="goToDetail">
    <h3>{{ event.title }}</h3>
    <p><strong>Publicado por:</strong> {{ event.user?.name || 'Anónimo' }}</p>
    <p>{{ event.description }}</p>
    <p><strong>Fecha:</strong> {{ formattedDate }}</p>
    <p><strong>Lugar:</strong> {{ event.location }}</p>
    <p><strong>Categoría:</strong> {{ event.category }}</p>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: Object
  },
  computed: {
    formattedDate() {
      return new Date(this.event.event_date).toLocaleString();
    }
  },
  methods: {
    goToDetail() {
      this.$router.push(`/guest-event/${this.event.id}`);
    }
  }
};
</script>

<style>
.event-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.event-card:hover {
  transform: scale(1.02);
}
</style>

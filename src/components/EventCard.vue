<template>
  <div class="event-card">
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p>{{ event.date }}</p>
    <button @click="goToEventDetail(event.id)">View Details</button>
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  },
  methods: {
    goToEventDetail(eventId) {
      this.$router.push(`/events/${eventId}`);
    }
  }
};
</script>

<style scoped>
.event-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  text-align: center;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

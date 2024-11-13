<template>
  <footer>
    <div class="footer-content">
      <p>&copy; 2024 Happenit. Todos los derechos reservados.</p>
      <div class="social-links">
        <a href="https://facebook.com/happenit" target="_blank">Facebook</a>
        <a href="https://twitter.com/happenit" target="_blank">Twitter</a>
        <a href="https://instagram.com/happenit" target="_blank">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
.footer-content {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

.footer-content p {
  margin: 10px 0;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-links a {
  color: white;
  text-decoration: none;
}

.social-links a:hover {
  text-decoration: underline;
}
</style>


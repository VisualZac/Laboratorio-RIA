<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="navbar">
    <div class="contenedor navbar__contenido">
      <RouterLink to="/" class="navbar__logo">Game Explorer</RouterLink>

      <nav class="navbar__menu">
        <RouterLink to="/" class="navbar__link">Inicio</RouterLink>
        <RouterLink to="/favoritos" class="navbar__link">Favoritos</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar__link {
  color: var(--color-texto-suave);
  transition: color 200ms ease;
}

.navbar__link:hover {
  color: var(--color-acento);
}

/*Responsive */
@media (max-width: 480px) {
  .navbar__contenido {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 0;
  }
}
</style>

<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="navbar">
    <div class="contenedor navbar__contenido">
       <img src="/logo.png" alt="Game Explorer" />

      <nav class="navbar__menu">
        <RouterLink to="/" class="navbar__link">Inicio</RouterLink>
        <RouterLink to="/favoritos" class="navbar__link">Favoritos</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>

.navbar {
  background-color: var(--color-superficie);
  border-bottom: 1px solid var(--color-borde);
}

.navbar__contenido {
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar__logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-texto);
}

.navbar__menu {
  display: flex;
  gap: 1rem;
}

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

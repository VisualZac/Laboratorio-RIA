<template>
  <header class="navbar">
    <div class="contenedor navbar__contenido">
      <h1 class="navbar__logo">Game Explorer</h1>

      <nav class="navbar__menu">
        <a href="#">Inicio</a>
        <a href="#">Juegos</a>
        <a href="#">Favoritos</a>
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
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar__logo {
  color: var(--color-acento);
}

.navbar__menu {
  display: flex;
  gap: 1rem;
}

.navbar__menu a {
  color: var(--color-texto-suave);
}

.navbar__menu a:hover {
  color: var(--color-acento);
}
</style>

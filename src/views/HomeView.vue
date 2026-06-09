<script setup>
// Esta vista es el inicio de tu app.
// Por ahora solo muestra un mensaje estático.
// En la etapa 3 la vamos a conectar con la API de RAWG.
</script>

<template>
  <main class="inicio">
    <div class="contenedor">
      <h1 class="inicio__titulo">Bienvenido a tu Game Explorer</h1>
      <p class="inicio__subtitulo">Acá van a aparecer los juegos cuando conectemos la API.</p>
    </div>
  </main>
</template>

<style scoped>
/* BEM: "inicio" es el bloque, "titulo" y "subtitulo" son elementos */
.inicio {
  padding: 4rem 0;
}

.inicio__titulo {
  font-size: 2rem;
  color: var(--color-acento);
  margin-bottom: 1rem;
}

.inicio__subtitulo {
  color: var(--color-texto-suave);
}
</style>

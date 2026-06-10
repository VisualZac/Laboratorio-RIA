<script setup lang="ts">
import ItemCard from '../components/game/ItemCard.vue'
</script>

<template>
  <main class="inicio">
    <div class="contenedor">
      <h1 class="inicio__titulo">Bienvenido a tu Game Explorer</h1>

      <p class="inicio__subtitulo">
        Acá van a aparecer los juegos cuando conectemos la API.
      </p>

      <ItemCard />
    </div>
  </main>
</template>

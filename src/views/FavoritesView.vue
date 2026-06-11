<script setup>
import { useFavoritesStore } from "@/stores/favorites.js";
import GameCard from "@/components/game/GameCard.vue";

const favStore = useFavoritesStore();
</script>

<template>
  <div class="favorite content">
    <h1 class="favorite__tittle">Mis Favoritos</h1>

    <!-- Si esta vacio el array -->
    <div v-if="favStore.favorites.length === 0" class="favorite__null">
      <p class="favorite__null-text">No has guardado ningún juego todavia.</p>
      <RouterLink to="/" class="favorite__back">← Volver a explorar</RouterLink>
    </div>

    <!-- Traemo los favoritos -->
    <div v-else class="favorite__grilla">
      <GameCard v-for="juego in favStore.favorites" :key="juego.id" :game="juego" />
    </div>
  </div>
</template>

<style scoped>
.favorite {
  padding: 3rem 0;
}

.favorite__tittle {
  font-size: 2rem;
  color: var(--color-acento);
  margin-bottom: 2rem;
}

.favorite__null {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 5rem 0;
  text-align: center;
}

.favorite__null-text {
  color: var(--color-texto-suave);
  font-size: 1.1rem;
}

.favorite__back {
  color: var(--color-acento);
  border: 1px solid var(--color-acento);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radio-md);
  transition: background-color 200ms ease;
}

.favorite__back:hover {
  background-color: rgba(108, 99, 255, 0.15);
}

.favorite__grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import GameCard from "@/components/game/GameCard.vue";
import { gameService } from "@/services/api.js";

const listaJuegos = ref([]);
const loading = ref(true);

onMounted(async () => {
  listaJuegos.value = await gameService.getPopularGames();
  loading.value = false;
});
</script>

<template>
  <main class="inicio">
    <div class="contenedor">
      <h1 class="inicio__titulo">Game Explorer</h1>
      <div v-if="loading">Cargando juegos...</div>
      <div v-else class="inicio__grilla">
        <GameCard v-for="juego in listaJuegos" :key="juego.id" :game="juego" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.inicio {
  padding: 4rem 0;
}

.inicio__titulo {
  font-size: 2rem;
  color: var(--color-acento);
  margin-bottom: 2rem;
}

.inicio__grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.inicio__loading {
  color: var(--color-texto-suave);
  text-align: center;
  font-size: 1.2rem;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import GameCard from "@/components/game/GameCard.vue";
import { gameService } from "@/services/api.js";
import { useSearch } from "@/composables/useSearch.js";

const listaJuegos = ref([]);
const loading = ref(true);

const { busqueda, listaFiltrada: juegosFiltrados, alEscribir, limpiar } = useSearch(listaJuegos);

onMounted(async () => {
  listaJuegos.value = await gameService.getPopularGames();
  loading.value = false;
});
</script>
<template>
  <div class="contenedor inicio">
    <h1 class="inicio__titulo">Game Explorer</h1>

    <!-- Formulario de búsqueda -->
    <div class="buscador">
      <input
        class="buscador__input"
        type="text"
        placeholder="Buscar juego..."
        :value="busqueda"
        @input="alEscribir"
      />
      <button v-if="busqueda" class="buscador__limpiar" @click="limpiar">✕</button>
    </div>

    <!-- resultados de la busqueda -->
    <p v-if="busqueda" class="inicio__resultados">
      {{ juegosFiltrados.length }} resultado{{ juegosFiltrados.length !== 1 ? "s" : "" }} para
      "<strong>{{ busqueda }}</strong
      >"
    </p>

    <!-- Loading -->
    <div v-if="loading" class="inicio__loading">Cargando juegos...</div>

    <!-- Sin resultados -->
    <div v-else-if="juegosFiltrados.length === 0" class="inicio__sin-resultados">
      No encontramos juegos con ese nombre.
    </div>

    <!-- Grilla -->
    <div v-else class="inicio__grilla">
      <GameCard v-for="juego in juegosFiltrados" :key="juego.id" :game="juego" />
    </div>
  </div>
</template>

<style scoped>
.inicio {
  padding: 3rem 0;
}

.inicio__titulo {
  font-size: 2rem;
  color: var(--color-acento);
  margin-bottom: 1.5rem;
}

.buscador {
  position: relative;
  margin-bottom: 1rem;
  max-width: 480px;
}

.buscador__input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-md);
  color: var(--color-texto);
  font-size: 1rem;
  outline: none;
  transition: border-color 200ms ease;
}

.buscador__input:focus {
  border-color: var(--color-acento);
}

.buscador__input::placeholder {
  color: var(--color-texto-suave);
}

.buscador__limpiar {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-texto-suave);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem;
  transition: color 200ms ease;
}

.buscador__limpiar:hover {
  color: var(--color-texto);
}

.inicio__resultados {
  font-size: 0.875rem;
  color: var(--color-texto-suave);
  margin-bottom: 1.5rem;
}

.inicio__resultados strong {
  color: var(--color-texto);
}

.inicio__loading,
.inicio__sin-resultados {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-texto-suave);
}

.inicio__grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>

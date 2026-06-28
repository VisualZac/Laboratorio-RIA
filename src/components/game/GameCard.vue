<script setup>
import { useFavoritesStore } from "@/stores/favorites.js";
const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});

function soloAnio(fecha) {
  if (!fecha) return "";
  return fecha.slice(0, 4);
}

function colorRating(rating) {
  if (rating >= 4.5) return "#4caf50"; // Verde para los juegos GOD
  if (rating >= 3.5) return "#ffeb3b"; // Amarillo para los juegardos
  return "#f44336"; // Rojo para los juegos HORRIBLES
}

const favStore = useFavoritesStore();
</script>

<template>
  <router-link :to="{ name: 'game-detail', params: { id: props.game.id } }" class="game-card">
    <div class="game-card__portada">
      <img
        v-if="props.game.background_image"
        :src="props.game.background_image"
        :alt="props.game.name"
        class="game-card__imagen"
        loading="lazy"
      />
      <!--loading="lazy" sirve para retrasar la carga de imágenes, hasta que el usuario hace scroll hasta ellos -->
      <div v-else class="game-card__sin-imagen">Sin imagen disponible</div>

      <div class="game-card__rating-bar">
        <div
          class="game-card__rating-fill"
          :style="{
            width: (props.game.rating / 5) * 100 + '%',
            backgroundColor: colorRating(props.game.rating),
          }"
        ></div>
        <span class="game-card__rating-texto">
          ★ {{ props.game.rating?.toFixed(1) ?? "S/D" }}
        </span>
      </div>

      <button
        class="game-card__fav-btn"
        :class="{ 'game-card__fav-btn--activo': favStore.isFavorite(props.game.id) }"
        @click.prevent="favStore.toggleFavorite(props.game)"
      >
        {{ favStore.isFavorite(props.game.id) ? "♥" : "♡" }}
      </button>
    </div>

    <div class="game-card__info">
      <h3 class="game-card__nombre">{{ props.game.name }}</h3>

      <div class="game-card__pie">
        <div class="game-card__generos">
          <span
            v-for="genero in props.game.genres?.slice(0, 2)"
            :key="genero.id"
            class="game-card__genero-tag"
          >
            {{ genero.name }}
          </span>
        </div>
        <span class="game-card__anio">
          {{ soloAnio(props.game.released) }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.game-card {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  overflow: hidden; /* para que la imagen respete el border-radius */
  cursor: pointer;
  transition:
    transform 250ms ease,
    border-color 250ms ease;
}

.game-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-acento);
}

/* ── Portada ── */
.game-card__portada {
  position: relative; /* para poder posicionar el rating encima */
  aspect-ratio: 16 / 9; /* proporción fija independiente del ancho */
  background-color: #1e2535;
  overflow: hidden;
}

.game-card__imagen {
  width: 100%;
  height: 100%;
  object-fit: cover; /* recorta la imagen sin deformarla */
  transition: transform 400ms ease;
}

.game-card:hover .game-card__imagen {
  transform: scale(1.05); /* zoom sutil al hacer hover */
}

.game-card__sin-imagen {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-texto-suave);
  font-size: 0.875rem;
}

.game-card__rating-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.15);
}

.game-card__rating-fill {
  height: 100%;
  border-radius: 0 2px 2px 0;
  transition: width 600ms ease;
}

.game-card__rating-texto {
  position: absolute;
  bottom: 8px;
  left: 0.5rem;
  background: rgba(13, 15, 20, 0.8);
  padding: 2px 8px;
  border-radius: var(--radio-sm);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-texto);
}

/* ── Info ── */
.game-card__info {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.game-card__nombre {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-texto);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.game-card__pie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.game-card__generos {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.game-card__genero-tag {
  padding: 2px 8px;
  background-color: #1e2535;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-sm);
  font-size: 0.75rem;
  color: var(--color-texto-suave);
}

.game-card__anio {
  font-size: 0.75rem;
  color: #4a5268;
  white-space: nowrap;
}
.game-card__fav-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(13, 15, 20, 0.75);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: var(--color-texto-suave);
  font-size: 1rem;
  transition:
    color 200ms ease,
    transform 200ms ease;
}

.game-card__fav-btn:hover {
  transform: scale(1.2);
  color: #f87171;
}

.game-card__fav-btn--activo {
  color: #f87171;
}
</style>

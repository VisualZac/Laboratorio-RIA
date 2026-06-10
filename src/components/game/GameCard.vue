<script setup>
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
  return "#f44336"; // Rojo para los juegos HORRIBLES que dan ganas de llorar
}
</script>

<template>
  <router-link :to="{ name: 'game-detail', params: { id: props.game.id } }" class="game-card">
    <div class="game-card__portada">
      <img
        v-if="props.game.background_image"
        :src="props.game.background_image"
        :alt="props.game.name"
        class="game-card__imagen"
      />
      <div v-else class="game-card__sin-imagen">Sin imagen disponible</div>

      <span class="game-card__rating" :style="{ color: colorRating(props.game.rating) }">
        ★ {{ props.game.rating }}
      </span>
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

.game-card__rating {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  background: rgba(13, 15, 20, 0.8);
  padding: 2px 8px;
  border-radius: var(--radio-sm);
  font-size: 0.75rem;
  font-weight: 700;
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
  /* Truncar si el nombre es muy largo */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>

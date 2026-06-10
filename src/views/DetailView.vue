<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { gameService } from "@/services/api.js";

const route = useRoute();
const router = useRouter();

const juego = ref(null);
const loading = ref(true);

onMounted(async () => {
  const gameId = route.params.id;
  const dataGame = await gameService.getGameDetails(gameId);

  if (dataGame) {
    juego.value = dataGame;
  } else {
    router.push({ name: "home" });
  }
  loading.value = false;
});
</script>

<template>
  <div class="juego-detalle">
    <div v-if="loading" class="juego-detalle__loading">Cargando detalles del juego...</div>

    <main v-else-if="juego" class="juego-detalle__contenido">
      <button @click="router.push({ name: 'home' })" class="juego-detalle__boton-volver">
        ← Volver al inicio
      </button>

      <div
        class="juego-detalle__hero"
        :style="{ backgroundImage: `url(${juego.background_image})` }"
      >
        <div class="juego-detalle__overlay">
          <h1 class="juego-detalle__titulo">{{ juego.name }}</h1>
        </div>
      </div>

      <div class="juego-detalle__info">
        <div class="juego-detalle__columna">
          <h3 class="juego-detalle__subtitulo">Detalles del juego:</h3>
          <p class="juego-detalle__texto">
            <strong>Fecha de lanzamiento: </strong>{{ juego.released || "No disponible" }}
          </p>
          <p class="juego-detalle__texto"><strong>Puntuación: </strong>★ {{ juego.rating }} / 5</p>
          <p class="juego-detalle__texto">
            <strong>Sitio web: </strong>
            <a :href="juego.website" target="_blank" class="juego-detalle__link">
              {{ juego.website || "Sin sitio web" }}
            </a>
          </p>
        </div>

        <div class="juego-detalle__columna">
          <h3 class="juego-detalle__subtitulo">Sinopsis / Descripción</h3>
          <div v-html="juego.description" class="juego-detalle__descripcion"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ── Estilos organizados con BEM ── */
.juego-detalle {
  padding: 2rem 0;
}

.juego-detalle__loading {
  text-align: center;
  font-size: 1.5rem;
  color: var(--color-texto-suave);
  padding: 4rem 0;
}

.juego-detalle__boton-volver {
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  color: var(--color-texto);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radio-sm);
  cursor: pointer;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.juego-detalle__boton-volver:hover {
  background-color: var(--color-borde);
}

.juego-detalle__hero {
  height: 380px;
  background-size: cover;
  background-position: center;
  border-radius: var(--radio-lg);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.juego-detalle__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 15, 20, 0.95) 10%, rgba(13, 15, 20, 0.3));
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.juego-detalle__titulo {
  font-size: 2.5rem;
  color: var(--color-texto);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.juego-detalle__info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

/* Responsivo: Si la pantalla es grande, se divide en dos columnas */
@media (min-width: 768px) {
  .juego-detalle__info {
    grid-template-columns: 1fr 2fr;
  }
}

.juego-detalle__columna {
  background-color: var(--color-superficie);
  padding: 1.5rem;
  border-radius: var(--radio-lg);
  border: 1px solid var(--color-borde);
}

.juego-detalle__subtitulo {
  font-size: 1.25rem;
  color: var(--color-acento);
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-borde);
  padding-bottom: 0.5rem;
}

.juego-detalle__texto {
  margin-bottom: 0.75rem;
  color: var(--color-texto);
  font-size: 0.95rem;
}

.juego-detalle__link {
  color: var(--color-acento);
  text-decoration: none;
  word-break: break-all; /* Evita que urls largas rompan el diseño */
}

.juego-detalle__link:hover {
  text-decoration: underline;
}

/* Estilos especiales para el HTML inyectado por v-html */
.juego-detalle__descripcion :deep(p) {
  color: var(--color-texto-suave);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.juego-detalle__descripcion :deep(h3) {
  color: var(--color-texto);
  margin: 1.5rem 0 0.5rem 0;
}
</style>

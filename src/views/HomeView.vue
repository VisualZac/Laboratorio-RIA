<script setup>
import { ref, onMounted, watch } from "vue";
import GameCard from "@/components/game/GameCard.vue";
import { gameService } from "@/services/api.js";
import { useSearch } from "@/composables/useSearch.js";
import SkeletonCard from "@/components/ui/skeletonCard.vue";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll.js";
import ErrorState from "@/components/ui/ErrorState.vue";

const listaJuegos = ref([]);
const generos = ref([]);
const loading = ref(true);
const error = ref(false);
const paginadoActual = ref(0);

const { busqueda, genero, alEscribir, limpiarBusqueda, setGenero } = useSearch();
const { cargando, hayMas, reiniciar } = useInfiniteScroll(cargarMasPagina);

const ordenamiento = ref("-rating");

const opcionesOrden = [
  { valor: "-rating", etiqueta: "Más populares" },
  { valor: "-released", etiqueta: "Más recientes" },
  { valor: "name", etiqueta: "Nombre A-Z" },
  { valor: "-name", etiqueta: "Nombre Z-A" },
];

// ── Carga unificada ─────────────────────────────────────────────────────────
// Una sola función llama a la API con los tres parámetros combinados.
// Se usa tanto para el infinite scroll como para la carga inicial y los resets.

async function cargarMasPagina() {
  if (loading.value && paginadoActual.value > 0) {
    loading.value = false;
  }

  paginadoActual.value++;

  const resultado = await gameService.buscarConFiltros({
    termino: busqueda.value,
    genero: genero.value,
    ordering: ordenamiento.value,
    page: paginadoActual.value,
  });

  listaJuegos.value.push(...resultado.juegos);

  return resultado.hayMas;
}

async function resetearYCargar() {
  loading.value = true;
  error.value = false;

  listaJuegos.value = [];
  paginadoActual.value = 0;

  reiniciar();

  try {
    await cargarMasPagina();
  } catch (e) {
    console.error(e);
    error.value = true;
  } finally {
    loading.value = false;
  }
}

// ── Watchers ─────────────────────────────────────────────────────────────────
// Cada vez que cambia la búsqueda, el género o el orden, recargamos desde cero.
// Usamos un debounce solo en la búsqueda de texto para no disparar en cada tecla.

let timerBusqueda = null;

watch(busqueda, () => {
  clearTimeout(timerBusqueda);
  timerBusqueda = setTimeout(async () => {
    await resetearYCargar();
  }, 400);
});

watch(genero, async () => {
  await resetearYCargar();
});

async function cambiarOrden(nuevoOrden) {
  ordenamiento.value = nuevoOrden;
  await resetearYCargar();
}

// ── Montaje ───────────────────────────────────────────────────────────────────
onMounted(async () => {
  const [, listaGeneros] = await Promise.all([resetearYCargar(), gameService.getGenres()]);
  generos.value = listaGeneros;
  loading.value = false;
});
</script>

<template>
  <div class="contenedor inicio">
    <h1 class="inicio__titulo">Game Explorer</h1>

    <!-- Controles de búsqueda y filtrado -->
    <div class="inicio__controles">
      <!-- Selector de ordenamiento -->
      <select
        class="filtro-genero"
        :value="ordenamiento"
        @change="cambiarOrden($event.target.value)"
      >
        <option v-for="op in opcionesOrden" :key="op.valor" :value="op.valor">
          {{ op.etiqueta }}
        </option>
      </select>

      <!-- Buscador por texto -->
      <div class="buscador">
        <input
          class="buscador__input"
          type="text"
          placeholder="Buscar juego..."
          :value="busqueda"
          @input="alEscribir"
        />
        <button v-if="busqueda" class="buscador__limpiar" @click="limpiarBusqueda">✕</button>
      </div>

      <!-- Selector de género -->
      <select class="filtro-genero" :value="genero" @change="setGenero($event.target.value)">
        <option value="">Todos los géneros</option>
        <option v-for="g in generos" :key="g.id" :value="g.slug">
          {{ g.name }}
        </option>
      </select>

      <!-- Botón limpiar filtro de género -->
      <button v-if="genero" class="filtro-limpiar" @click="setGenero('')">✕ Limpiar género</button>
    </div>

    <!-- Contador de resultados (cuando hay algún filtro activo) -->
    <p v-if="busqueda || genero" class="inicio__resultados">
      {{ listaJuegos.length }} resultado{{ listaJuegos.length !== 1 ? "s" : "" }}
    </p>

    <!-- Skeleton loaders mientras carga por primera vez -->
    <div v-if="loading && listaJuegos.length === 0" class="inicio__grilla">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>

    <ErrorState
      v-else-if="error"
      titulo="No pudimos cargar los juegos"
      mensaje="Revisa tu conexión e inténtalo nuevamente."
      @retry="resetearYCargar"
    />

    <!-- Sin resultados -->
    <div v-else-if="listaJuegos.length === 0 && !cargando" class="inicio__sin-resultados">
      No encontramos juegos con esos filtros.
    </div>

    <!-- Grilla de juegos -->
    <div v-else class="inicio__grilla">
      <GameCard v-for="juego in listaJuegos" :key="juego.id" :game="juego" />
    </div>

    <!-- Spinner de infinite scroll -->
    <div v-if="cargando" class="inicio__cargando-mas">
      <div class="inicio__spinner"></div>
      <p>Cargando más juegos...</p>
    </div>

    <!-- Fin de resultados -->
    <div v-else-if="!hayMas && listaJuegos.length > 0" class="inicio__fin">
      Ya viste todos los juegos disponibles
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

/* ── Controles ── */
.inicio__controles {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

/* BEM Block: buscador */
.buscador {
  position: relative;
  flex: 1;
  min-width: 200px;
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
  transition: color 200ms ease;
}

.buscador__limpiar:hover {
  color: var(--color-texto);
}

/* BEM Block: filtro-genero */
.filtro-genero {
  padding: 0.75rem 1rem;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-md);
  color: var(--color-texto);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: border-color 200ms ease;
}

.filtro-genero:focus {
  border-color: var(--color-acento);
}

.filtro-limpiar {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-error, #f87171);
  border-radius: var(--radio-md);
  background: none;
  color: var(--color-error, #f87171);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 200ms ease;
  white-space: nowrap;
}

.filtro-limpiar:hover {
  background-color: rgba(248, 113, 113, 0.1);
}

/* ── Resultados ── */
.inicio__resultados {
  font-size: 0.875rem;
  color: var(--color-texto-suave);
  margin-bottom: 1.5rem;
}

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

/* ── Infinite scroll ── */
.inicio__cargando-mas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 0;
  color: var(--color-texto-suave);
  font-size: 0.875rem;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

.inicio__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-borde);
  border-top-color: var(--color-acento);
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

.inicio__fin {
  text-align: center;
  padding: 2rem 0;
  color: var(--color-texto-suave);
  font-size: 0.875rem;
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .inicio__titulo {
    font-size: 1.5rem;
  }

  .inicio__controles {
    flex-direction: column;
    align-items: stretch;
  }

  .filtro-genero {
    width: 100%;
  }
}
</style>

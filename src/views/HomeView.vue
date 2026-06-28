<script setup>
import { ref, onMounted, watch } from "vue";
import GameCard from "@/components/game/GameCard.vue";
import { gameService } from "@/services/api.js";
import { useSearch } from "@/composables/useSearch.js";
import SkeletonCard from "@/components/ui/skeletonCard.vue";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll.js";

const listaJuegos = ref([]);
const generos = ref([]);
const loading = ref(true);
const paginadoActual = ref(1);

const { busqueda, filtros, listaCompleta, alEscribir, limpiar, setGenero } = useSearch(listaJuegos);
const { cargando, hayMas, reiniciar } = useInfiniteScroll(cargarMasJuegos);

let timerBusqueda = null;

watch(busqueda, (nuevaBusqueda) => {
  clearTimeout(timerBusqueda);
  timerBusqueda = setTimeout(async () => {
    listaJuegos.value = [];
    paginadoActual.value = 0;
    reiniciar();

    if (nuevaBusqueda.trim()) {
      // Hay texto → buscar en la API (infinite scroll desactivado en búsqueda)
      const resultado = await gameService.buscarJuegos(nuevaBusqueda.trim(), 1);
      listaJuegos.value = resultado.juegos;
      // La búsqueda tiene su propio paginado — dejamos hayMas en manos del resultado
      hayMas.value = resultado.hayMas;
    } else {
      // No hay texto → volver a populares desde página 1
      await cargarMasJuegos();
    }
  }, 400);
});

// El filtro de género filtra localmente, no hace falta recargar la API.
// Solo reseteamos el paginado para que el infinite scroll vuelva a activarse.
watch(filtros, () => {
  paginadoActual.value = 1;
  reiniciar();
});

const ordenamiento = ref("-rating"); // En default por los más populares

// Opciones disponibles
const opcionesOrden = [
  { valor: "-rating", etiqueta: "Más populares" },
  { valor: "-released", etiqueta: "Más recientes" },
  { valor: "-metacritic", etiqueta: "Mejor puntuados" },
  { valor: "name", etiqueta: "Nombre A-Z" },
];

// Función que carga la siguiente página y la agrega a la lista
async function cargarMasJuegos() {
  paginadoActual.value++;
  const resultado = await gameService.getPopularGames(paginadoActual.value, ordenamiento.value);
  listaJuegos.value.push(...resultado.juegos);
  // Devolvemos si hay más para que useInfiniteScroll sepa si seguir
  return resultado.hayMas;
}

// Cuando cambia el orden, limpiamos búsqueda y reseteamos todo
function cambiarOrden(nuevoOrden) {
  // Si hay búsqueda activa, la limpiamos primero para no mezclar resultados
  if (busqueda.value) {
    busqueda.value = "";
    sessionStorage.removeItem("busqueda_actual");
  }
  ordenamiento.value = nuevoOrden;
  listaJuegos.value = [];
  paginadoActual.value = 0; // cargarMasJuegos hace ++ antes del fetch, arranca en 1
  reiniciar();
  cargarMasJuegos();
}

onMounted(async () => {
  const [resultado, listaGeneros] = await Promise.all([
    gameService.getPopularGames(1, ordenamiento.value),
    gameService.getGenres(),
  ]);
  listaJuegos.value = resultado.juegos;
  paginadoActual.value = 1;
  generos.value = listaGeneros;
  loading.value = false;
});
</script>
<template>
  <div class="contenedor inicio">
    <h1 class="inicio__titulo">Game Explorer</h1>

    <!-- Control de Busqueda y Filtrado -->
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
      <!-- Buscador -->
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

      <!-- Seleccionar Genero con select y no v-model-->
      <!--v-model solo actualizaria el ref y no guardar en el sessionStorage porque no puede hacer las dos al mismo tiempo-->
      <!--Con el @change tenes la posibilidad de hacer ese control de de las dos cosas actualizar y guardar-->
      <select class="filtro-genero" :value="filtros" @change="setGenero($event.target.value)">
        <option value="">Todos los Generos</option>
        <option v-for="genero in generos" :key="genero.id" :value="genero.slug">
          {{ genero.name }}
        </option>
      </select>

      <!--Boton de limpiar los filtros(solo aparecera si tiene un filtro seleccionado :D)-->

      <button v-if="filtros" class="filtro-limpiar" @click="setGenero('')">
        ✕ Limpiar filtros
      </button>
    </div>

    <!--Contador de Resultados-->
    <p v-if="busqueda || filtros" class="inicio__resultados">
      {{ listaCompleta.length }} resultado{{ listaCompleta.length !== 1 ? "s" : "" }}
    </p>

    <!-- Skeleton loaders mientras carga -->
    <div v-if="loading" class="inicio__grilla">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>

    <!-- Sin resultados -->
    <div v-else-if="listaCompleta.length === 0" class="inicio__sin-resultados">
      No encontramos juegos con ese nombre.
    </div>

    <!-- Grilla -->
    <div v-else class="inicio__grilla">
      <GameCard v-for="juego in listaCompleta" :key="juego.id" :game="juego" />
    </div>

    <!-- Indicador de carga al final de la página -->
    <div v-if="cargando" class="inicio__cargando-mas">
      <div class="inicio__spinner"></div>
      <p>Cargando más juegos...</p>
    </div>

    <!-- Mensaje cuando ya no hay más -->
    <div v-else-if="!hayMas && listaCompleta.length > 0" class="inicio__fin">
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
  flex-wrap: wrap; /* en mobile se apilan */
  margin-bottom: 1rem;
}

/* BEM Block: buscador */
.buscador {
  position: relative;
  flex: 1; /* ocupa el espacio disponible */
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

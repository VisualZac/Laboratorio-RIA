<script setup>
import { ref, onMounted } from "vue";
import GameCard from "@/components/game/GameCard.vue";
import { gameService } from "@/services/api.js";
import { useSearch } from "@/composables/useSearch.js";

const listaJuegos = ref([]);
const loading = ref(true);
const generos = ref([]);

const { busqueda, filtros, listaCompleta, alEscribir, limpiar, setGenero } = useSearch(listaJuegos);

onMounted(async () => {
  //cargamos juegos y generos en simultaneo, se usa promiseall porque no se puede hacer con dos await aparentemente no se pueden hacer dos fetch seguidos,
  //cargaria uno y despue el otro >:C, con primiseall esto no ocurre y los pueden estar al mismo tiempo :D
  const [juegos, listaGeneros] = await Promise.all([
    gameService.getPopularGames(),
    gameService.getGenres(),
  ]);
  listaJuegos.value = juegos;
  generos.value = listaGeneros;
  loading.value = false;
});
</script>
<template>
  <div class="contenedor inicio">
    <h1 class="inicio__titulo">Game Explorer</h1>

    <!-- Control de Busqueda y Filtrado -->
    <div class="inicio__controles">
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
    <!-- Loading -->
    <div v-if="loading" class="inicio__loading">Cargando juegos...</div>

    <!-- Sin resultados -->
    <div v-else-if="listaCompleta.length === 0" class="inicio__sin-resultados">
      No encontramos juegos con ese nombre.
    </div>

    <!-- Grilla -->
    <div v-else class="inicio__grilla">
      <GameCard v-for="juego in listaCompleta" :key="juego.id" :game="juego" />
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

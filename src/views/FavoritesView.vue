<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useFavoritesStore } from "@/stores/favorites.js";
import GameCard from "@/components/game/GameCard.vue";

const favStore = useFavoritesStore();

// Conteo de géneros para el gráfico
const generoConteo = computed(() => {
  const conteo = {};
  favStore.favorites.forEach((juego) => {
    juego.genres?.forEach((g) => {
      conteo[g.name] = (conteo[g.name] || 0) + 1;
    });
  });
  return conteo;
});

// Referencia al canvas del gráfico
const chartCanvas = ref(null);
let chartInstance = null;

async function renderChart() {
  if (!chartCanvas.value || favStore.favorites.length === 0) return;

  const { Chart, registerables } = await import("chart.js");
  Chart.register(...registerables);

  // Destruir instancia anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const labels = Object.keys(generoConteo.value);
  const valores = Object.values(generoConteo.value);

  const colores = [
    "#6c63ff",
    "#22d3a0",
    "#f59e0b",
    "#f87171",
    "#60a5fa",
    "#a78bfa",
    "#34d399",
    "#fb923c",
  ];

  chartInstance = new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: valores,
          backgroundColor: colores.slice(0, labels.length),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#e8eaf0",
            padding: 16,
            font: { size: 12 },
          },
        },
      },
    },
  });
}

// Renderizar chart cuando montan o cambian favoritos
onMounted(renderChart);
watch(() => favStore.favorites.length, renderChart);
</script>

<template>
  <div class="contenedor favoritos">
    <div class="favoritos__header">
      <h1 class="favoritos__titulo">Mis Favoritos</h1>
      <button
        v-if="favStore.favorites.length > 0"
        class="favoritos__limpiar"
        @click="favStore.clearFavorites()"
      >
        ✕ Vaciar lista
      </button>
    </div>

    <!-- Estado vacío -->
    <div v-if="favStore.favorites.length === 0" class="favoritos__vacio">
      <p class="favoritos__vacio-texto">No guardaste ningún juego todavía.</p>
      <RouterLink to="/" class="favoritos__volver">← Volver a explorar</RouterLink>
    </div>

    <template v-else>
      <!-- Gráfico de géneros -->
      <div class="favoritos__chart-contenedor">
        <h2 class="favoritos__chart-titulo">Géneros en tu colección</h2>
        <div class="favoritos__chart-wrapper">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Grilla de favoritos -->
      <div class="favoritos__grilla">
        <GameCard v-for="juego in favStore.favorites" :key="juego.id" :game="juego" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.favoritos {
  padding: 3rem 0;
}

.favoritos__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.favoritos__titulo {
  font-size: 2rem;
  color: var(--color-acento);
}

.favoritos__limpiar {
  padding: 0.5rem 1rem;
  border: 1px solid #f87171;
  border-radius: var(--radio-md);
  background: none;
  color: #f87171;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.favoritos__limpiar:hover {
  background-color: rgba(248, 113, 113, 0.1);
}

.favoritos__vacio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 5rem 0;
  text-align: center;
}

.favoritos__vacio-texto {
  color: var(--color-texto-suave);
  font-size: 1.1rem;
}

.favoritos__volver {
  color: var(--color-acento);
  border: 1px solid var(--color-acento);
  padding: 0.5rem 1.5rem;
  border-radius: var(--radio-md);
  transition: background-color 200ms ease;
}

.favoritos__volver:hover {
  background-color: rgba(108, 99, 255, 0.15);
}

/* Chart */
.favoritos__chart-contenedor {
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.favoritos__chart-titulo {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-texto-suave);
  margin-bottom: 1rem;
}

.favoritos__chart-wrapper {
  max-width: 300px;
  margin: 0 auto;
}

.favoritos__grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>

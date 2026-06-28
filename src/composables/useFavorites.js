import { ref } from "vue";

const STORAGE_KEY = "gameexplorer_favoritos";

// Estado singleton compartido entre todas las instancias del composable
// Esto evita que dos componentes que usen useFavorites() directamente
// tengan estados desincronizados
function cargarDesdeStorage() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

function guardarEnStorage(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// ref fuera de la función → singleton: todos comparten el mismo estado reactivo
const favorites = ref(cargarDesdeStorage());

export function useFavorites() {
  function toggleFavorite(game) {
    const index = favorites.value.findIndex((g) => g.id === game.id);
    if (index >= 0) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push({
        id: game.id,
        name: game.name,
        rating: game.rating,
        released: game.released,
        background_image: game.background_image,
        genres: game.genres ?? [],
      });
    }
    guardarEnStorage(favorites.value);
  }

  function isFavorite(id) {
    return favorites.value.some((g) => g.id === id);
  }

  function clearFavorites() {
    favorites.value = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
}

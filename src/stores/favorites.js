import { defineStore } from "pinia";
import { ref } from "vue";

// Key del local Storage
const STORAGE_KEY = "gameexplorer_favoritos";

// Esta función lee los favoritos guardados al arrancar la app y si no hay nada guardado, devuelve un "array" vacío
function cargarDesdStorage() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return []; //Um array vacio
  }
}

export const useFavoritesStore = defineStore("favorites", () => {
  // Iniciamos con lo que tenga el Local Storage
  const favorites = ref(cargarDesdStorage());

  function guardarEnStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value));
  }

  function toggleFavorite(game) {
    const index = favorites.value.findIndex((g) => g.id === game.id);
    if (index >= 0) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(game);
    }
    guardarEnStorage(); // ← guardamos cada vez que cambia la lista
  }

  function isFavorite(gameID) {
    return favorites.value.some((g) => g.id === gameID);
  }

  return { favorites, toggleFavorite, isFavorite };
});

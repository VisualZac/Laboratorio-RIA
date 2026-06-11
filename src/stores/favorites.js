import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]);

  function toggleFavorite(game) {
    const index = favorites.value.findIndex((g) => g.id === game.id);
    if (index >= 0) {
      favorites.value.splice(index, 1); //si ya existe en la lista lo elimina
    } else {
      favorites.value.push(game); //si no existe en la lista lo agrega
    }
  }

  function isFavorite(gameID) {
    return favorites.value.some((g) => g.id === gameID);
  }

  return { favorites, toggleFavorite, isFavorite };
});

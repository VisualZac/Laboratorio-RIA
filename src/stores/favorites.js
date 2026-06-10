import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]);

  function toggleFavorite(game) {
    const index = favoritesList.value.findIndex((g) => g.id === game.id);
    if (index >= 0) {
      favoritesList.value.splice(index, 1); //si ya existe en la lista lo elimina
    } else {
      favoritesList.value.push(game); //si no existe en la lista lo agrega
    }
  }

  function isFavorite(gameID) {
    return favoritesList.value.some((g) => g.id === gameID);
  }

  return { favoritesList, toggleFavorite, isFavorite };
});

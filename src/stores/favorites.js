import { defineStore } from "pinia";
import { useFavorites } from "@/composables/useFavorites.js";

export const useFavoritesStore = defineStore("favorites", () => {
  const { favorites, toggleFavorite, isFavorite, clearFavorites } = useFavorites();

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
});

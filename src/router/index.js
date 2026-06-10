import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"; // Usando @

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/juego/:id",
      name: "game-detail",
      component: () => import("@/views/DetailView.vue"),
    },
    {
      path: "/favoritos",
      name: "favorites",
      // Usando @ para ir directo a src/views/FavoritesView.vue
      component: () => import("@/views/FavoritesView.vue"),
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'

// Por ahora solo tenemos una vista: el inicio
// Iremos agregando más a medida que las construyamos
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
  ],
})

export default router

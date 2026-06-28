# 🎮 Mi Lab RIA — Game Explorer

Aplicación web desarrollada con Vue 3 y Vite para explorar videojuegos utilizando la API RAWG.

## Tecnologías utilizadas

- Vue 3
- Vite
- JavaScript
- Vue Router
- Pinia
- HTML5
- CSS3
- RAWG API
- LocalStorage
- SessionStorage

## Estructura del proyecto

```text
src/
├── assets/
│   └── styles/
│       ├── main.css
│       └── variables.css
├── components/
│   ├── layout/
│   │   ├── TheNavbar.vue
│   │   └── TheFooter.vue
│   ├── game/
│   │   └── GameCard.vue
│   └── ui/
├── views/
│   ├── HomeView.vue
│   ├── DetailView.vue
│   ├── FavoritesView.vue
│   └── LoginView.vue
├── router/
│   └── index.js
├── stores/
├── services/
├── composables/
├── App.vue
└── main.js

Funcionalidades
      Navegación entre vistas con Vue Router.
      Consulta de videojuegos mediante la API RAWG.
      Visualización de detalle de cada juego.
      Búsqueda y filtrado de juegos.
      Gestión de favoritos con Pinia.
      Persistencia de favoritos en LocalStorage.
      Sesión simulada con SessionStorage.
      Componentes reutilizables.
      Estilos organizados con metodología BEM.

# Laboratorio-RIA

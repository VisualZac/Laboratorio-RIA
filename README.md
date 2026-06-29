# 🎮 Game Explorer

Aplicación frontend desarrollada como laboratorio del Taller de RIA 2026.  
Permite explorar, buscar y guardar videojuegos favoritos, consumiendo la API pública de [RAWG](https://rawg.io/apidocs).

---

## Tecnologías utilizadas

- **Vue 3** — Composition API
- **Vue Router** — Navegación entre vistas
- **Pinia** — Manejo de estado global
- **Vite** — Bundler y servidor de desarrollo
- **RAWG Video Games API** — Fuente de datos
- **Chart.js** — Visualización de datos en favoritos
- **BEM** — Metodología CSS

---

## Estructura del proyecto

```
src/
├── assets/
│   └── styles/
│       ├── main.css          ← Estilos globales y layout base
│       └── variables.css     ← Variables CSS (colores, espaciados, tipografía)
│
├── components/
│   ├── layout/
│   │   ├── TheNavbar.vue     ← Barra de navegación con toggle de tema
│   │   └── TheFooter.vue     ← Pie de página
│   ├── game/
│   │   └── GameCard.vue      ← Tarjeta de juego (BEM)
│   └── ui/
│       ├── OfflineBanner.vue ← Banner de modo offline
│       ├── ErrorState.vue    ← Estado de error reutilizable
│       └── skeletonCard.vue  ← Skeleton loader para carga
│
├── views/
│   ├── HomeView.vue          ← Listado principal con búsqueda, filtros e infinite scroll
│   ├── DetailView.vue        ← Detalle de un juego
│   ├── FavoritesView.vue     ← Juegos guardados + gráfico con Chart.js
│   └── LoginView.vue         ← Login simulado (sessionStorage)
│
├── router/
│   └── index.js              ← Rutas: /, /juego/:id, /favoritos, /login
│
├── stores/
│   ├── favorites.js          ← Store Pinia de favoritos
│   └── auth.js               ← Store Pinia de autenticación (sessionStorage)
│
├── composables/
│   ├── useFavorites.js       ← Lógica de favoritos + persistencia localStorage
│   ├── useTheme.js           ← Toggle tema oscuro/claro + localStorage
│   ├── useSearch.js          ← Lógica de búsqueda y filtrado
│   └── useInfiniteScroll.js  ← Scroll infinito reutilizable
│
├── services/
│   └── api.js                ← Cliente RAWG con caché en memoria (5 min)
│
├── App.vue                   ← Componente raíz
└── main.js                   ← Punto de entrada
```

---

## Instrucciones de ejecución

### Requisitos

- Node.js 18 o superior
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd lab-ria

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

### Credenciales de login simulado

```
Usuario: pablo
Contraseña: 1234
```

---

## Funcionalidades implementadas

### Obligatorias ✅

- Múltiples vistas con Vue Router (Home, Detalle, Favoritos, Login)
- Componentes reutilizables (GameCard, OfflineBanner, ErrorState, skeletonCard)
- Layout responsive con CSS moderno
- Consumo de la API RAWG (juegos, géneros, detalle)
- Render dinámico de información
- Formulario de login interactivo
- Búsqueda y filtrado dinámico por texto y género
- Estado compartido con Pinia (favoritos + auth)
- Persistencia: `localStorage` (favoritos, tema) y `sessionStorage` (sesión de usuario)
- Arquitectura organizada con separación de responsabilidades

### Bonus implementados ✅

- **Caché de datos** en memoria con TTL de 5 minutos (`api.js`)
- **Infinite scroll** mediante composable `useInfiniteScroll`
- **Charts / visualización** de géneros favoritos con Chart.js
- **Animaciones** en transiciones de tarjetas y estados de carga
- **Modo offline** con detección de conectividad y banner informativo
- **Lazy loading** de vistas con `import()` dinámico en el router

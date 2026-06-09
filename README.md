# 🎮 Mi Lab RIA — Game Explorer

Proyecto propio del laboratorio, construido desde cero.

## Cómo levantar el proyecto

```bash
npm install
npm run dev
```

## Estructura actual

```
src/
├── assets/styles/
│   └── main.css          ← Variables CSS y reset global
│
├── components/
│   ├── game/             ← Componentes de juegos (GameCard, etc.)
│   └── ui/               ← Componentes genéricos (Spinner, Empty, etc.)
│
├── views/
│   └── HomeView.vue      ← Vista de inicio (la que se ve en /)
│
├── router/
│   └── index.js          ← Rutas de la app
│
├── stores/               ← Estado compartido con Pinia (vacío por ahora)
├── services/             ← Comunicación con la API (vacío por ahora)
├── composables/          ← Lógica reutilizable (vacío por ahora)
└── data/                 ← Datos estáticos si los necesitamos
```

## Lo que viene (por etapas)

- [x] Etapa 1: Conceptos base de Vue
- [x] Etapa 2: Proyecto base creado ← estás acá
- [ ] Etapa 3: Vue Router (múltiples vistas)
- [ ] Etapa 4: Componente GameCard con BEM
- [ ] Etapa 5: Pinia (estado compartido)
- [ ] Etapa 6: Consumo de API RAWG

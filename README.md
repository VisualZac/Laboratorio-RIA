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
├── assets/
│   └── styles/
│       ├── main.css          ← Estilos globales y layout base
│       └── variables.css     ← Variables CSS globales
│
├── components/
│   ├── layout/
│   │   ├── TheNavbar.vue
│   │   └── TheFooter.vue
│   │
│   ├── game/                ← Componentes relacionados con juegos
│   │
│   └── ui/                  ← Componentes reutilizables de interfaz
│
├── views/
│   └── HomeView.vue
│
├── router/
│   └── index.js
│
├── stores/                  ← Estado global (Pinia)
├── services/                ← Consumo de APIs
├── composables/             ← Lógica reutilizable
├── data/                    ← Datos estáticos
│
├── App.vue                  ← Componente raíz
└── main.js                  ← Punto de entrada


## Lo que viene (por etapas)

- [x] Etapa 1: Conceptos base de Vue
- [x] Etapa 2: Proyecto base creado ← estás acá
- [ ] Etapa 3: Vue Router (múltiples vistas)
- [ ] Etapa 4: Componente GameCard con BEM
- [ ] Etapa 5: Pinia (estado compartido)
- [ ] # Etapa 6: Consumo de API RAWG

# Laboratorio-RIA

> > > > > > > 576b206d40f023c9a2cb897262a016940641ff00

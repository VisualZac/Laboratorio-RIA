<template>
  <div class="skeleton-card">
    <div class="skeleton-card__portada skeleton-card__portada--animado"></div>
    <div class="skeleton-card__cuerpo">
      <div
        class="skeleton-card__linea skeleton-card__linea--titulo skeleton-card__linea--animado"
      ></div>
      <div class="skeleton-card__pie">
        <div
          class="skeleton-card__linea skeleton-card__linea--tag skeleton-card__linea--animado"
        ></div>
        <div
          class="skeleton-card__linea skeleton-card__linea--tag skeleton-card__linea--animado"
        ></div>
        <div
          class="skeleton-card__linea skeleton-card__linea--anio skeleton-card__linea--animado"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulso {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* Block */
.skeleton-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  overflow: hidden;
}

/* Element: portada */
.skeleton-card__portada {
  aspect-ratio: 16 / 9;
  width: 100%;
  background-color: var(--color-borde);
}

/* Modifier: animado (se aplica a portada y líneas) */
.skeleton-card__portada--animado,
.skeleton-card__linea--animado {
  animation: pulso 1.4s ease-in-out infinite;
  background-color: var(--color-borde);
}

/* Element: cuerpo */
.skeleton-card__cuerpo {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Element: linea */
.skeleton-card__linea {
  border-radius: var(--radio-sm);
  height: 12px;
}

/* Modifiers de linea */
.skeleton-card__linea--titulo {
  width: 75%;
  height: 16px;
}

/* Element: pie */
.skeleton-card__pie {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.skeleton-card__linea--tag {
  width: 52px;
}

.skeleton-card__linea--anio {
  width: 36px;
  margin-left: auto;
}
</style>

<template>
  <div class="skeleton-card">
    <div class="skeleton-card__portada skeleton-card__pulso"></div>
    <div class="skeleton-card__body">
      <div class="skeleton-card__linea skeleton-card__pulso skeleton-card__linea--titulo"></div>
      <div class="skeleton-card__pie">
        <div class="skeleton-card__linea skeleton-card__pulso skeleton-card__linea--tag"></div>
        <div class="skeleton-card__linea skeleton-card__pulso skeleton-card__linea--tag"></div>
        <div class="skeleton-card__linea skeleton-card__pulso skeleton-card__linea--anio"></div>
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

.skeleton-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
  overflow: hidden;
}

.skeleton-card__pulso {
  animation: pulso 1.4s ease-in-out infinite;
  background-color: var(--color-borde);
}

.skeleton-card__portada {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.skeleton-card__body {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-card__linea {
  border-radius: var(--radio-sm);
  height: 12px;
}

.skeleton-card__linea--titulo {
  width: 75%;
  height: 16px;
}

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

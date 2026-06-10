<template>
  <article class="game-card">
    <h2 class="game-card__title">Tarjeta de prueba</h2>

    <p class="game-card__description">
      Esto es un ItemCard.
    </p>
  </article>
</template>

<style scoped>
.game-card {
  padding: 1rem;
  margin-top: 2rem;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-md);
}

.game-card__title {
  color: var(--color-acento);
}

.game-card__description {
  color: var(--color-texto-suave);
}
</style>

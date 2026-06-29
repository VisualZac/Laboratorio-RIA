<script setup>
defineProps({
  titulo: {
    type: String,
    default: "Ocurrió un error",
  },
  mensaje: {
    type: String,
    default: "No pudimos cargar la información.",
  },
});

defineEmits(["retry"]);
</script>

<template>
  <div class="error-state">
    <div class="error-state__icono">⚠️</div>

    <h2 class="error-state__titulo">
      {{ titulo }}
    </h2>

    <p class="error-state__mensaje">
      {{ mensaje }}
    </p>

    <button class="error-state__boton" @click="$emit('retry')">Reintentar</button>
  </div>
</template>

<style scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 1rem;
  text-align: center;
}

.error-state__icono {
  font-size: 3rem;
}

.error-state__titulo {
  color: var(--color-texto);
  font-size: 1.5rem;
}

.error-state__mensaje {
  color: var(--color-texto-suave);
  max-width: 420px;
  line-height: 1.5;
}

.error-state__boton {
  margin-top: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--radio-md);
  background: var(--color-acento);
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.error-state__boton:hover {
  opacity: 0.9;
}
</style>

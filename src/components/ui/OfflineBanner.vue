<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const offline = ref(!navigator.onLine);

function actualizarEstado() {
  offline.value = !navigator.onLine;
}

onMounted(() => {
  window.addEventListener("online", actualizarEstado);
  window.addEventListener("offline", actualizarEstado);
});

onUnmounted(() => {
  window.removeEventListener("online", actualizarEstado);
  window.removeEventListener("offline", actualizarEstado);
});
</script>

<template>
  <div v-if="offline" class="offline-banner">
    ⚠ Sin conexión — algunos datos pueden no estar disponibles
  </div>
</template>

<style scoped>
.offline-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f59e0b;
  color: #1a1a2e;
  padding: 0.6rem 1.5rem;
  border-radius: var(--radio-md);
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}
</style>

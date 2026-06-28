import { ref, onMounted, onUnmounted } from "vue";

export function useInfiniteScroll(callback) {
  const cargando = ref(false);
  const hayMas = ref(true);

  function reiniciar() {
    hayMas.value = true;
    cargando.value = false;
  }

  async function revisarScroll() {
    if (cargando.value || !hayMas.value) return;

    const scrollActual = window.scrollY;
    const alturaVisible = window.innerHeight;
    const alturaTotal = document.body.scrollHeight;

    const cerca300DelFondo = scrollActual + alturaVisible >= alturaTotal - 300;

    if (cerca300DelFondo) {
      cargando.value = true;
      const sigueHabiendo = await callback();
      // Si el callback devuelve explícitamente false, detenemos
      hayMas.value = sigueHabiendo !== false ? sigueHabiendo : false;
      cargando.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", revisarScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", revisarScroll);
  });

  // Exportamos hayMas para que HomeView pueda controlarlo externamente
  return { cargando, hayMas, reiniciar };
}

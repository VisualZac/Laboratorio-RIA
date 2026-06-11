import { ref, computed } from "vue";

const SESSION_KEY = "busqueda_actual";

export function useSearch(listaCompleta) {
  // Recuperamos la búsqueda de sessionStorage si es que existe
  const busqueda = ref(sessionStorage.getItem(SESSION_KEY) || "");

  // vue computed filtra la lista cada vez que se cambia algo en la búsqueda
  const listaFiltrada = computed(() => {
    const termino = busqueda.value.toLowerCase().trim();
    if (!termino) return listaCompleta.value;
    return listaCompleta.value.filter((item) => item.name.toLowerCase().includes(termino));
  });

  function alEscribir(evento) {
    busqueda.value = evento.target.value;
    sessionStorage.setItem(SESSION_KEY, busqueda.value);
  }

  function limpiar() {
    busqueda.value = "";
    sessionStorage.removeItem(SESSION_KEY);
  }

  return { busqueda, listaFiltrada, alEscribir, limpiar };
}

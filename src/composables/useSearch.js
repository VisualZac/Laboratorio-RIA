import { ref } from "vue";

const SESSION_KEY_BUSQUEDA = "busqueda_actual";
const SESSION_GENERO = "genero_activo";

export function useSearch() {
  // Recuperamos los valores guardados en sessionStorage al recargar la página
  const busqueda = ref(sessionStorage.getItem(SESSION_KEY_BUSQUEDA) || "");
  const genero = ref(sessionStorage.getItem(SESSION_GENERO) || "");

  function alEscribir(evento) {
    busqueda.value = evento.target.value;
    sessionStorage.setItem(SESSION_KEY_BUSQUEDA, evento.target.value);
  }

  function limpiarBusqueda() {
    busqueda.value = "";
    sessionStorage.removeItem(SESSION_KEY_BUSQUEDA);
  }

  function setGenero(slug) {
    genero.value = slug;
    if (slug) {
      sessionStorage.setItem(SESSION_GENERO, slug);
    } else {
      sessionStorage.removeItem(SESSION_GENERO);
    }
  }

  return { busqueda, genero, alEscribir, limpiarBusqueda, setGenero };
}

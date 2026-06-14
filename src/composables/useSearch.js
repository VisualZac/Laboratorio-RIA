import { ref, computed } from "vue"; //

const SESSION_KEY_BUSQUEDA = "busqueda_actual";
const SESSION_GENERO = "genero_activo";

export function useSearch(listaCompleta) {
  // Tomamos la búsqueda de sessionStorage (si es que existe, porque sino no agarra nada)
  const busqueda = ref(sessionStorage.getItem(SESSION_KEY_BUSQUEDA) || "");

  //Filtros
  const filtros = ref(sessionStorage.getItem(SESSION_GENERO)); // Corregido: getItem

  //computed: aplica la busqueda y genero al mismo tiempo
  //solo se calcula cuando se cambia la busqueda, el genero activo (actual) o la lista completa
  const listaFiltrada = computed(() => {
    let resultado = [...listaCompleta.value];

    //   Filtro 1: por texto
    const texto = busqueda.value.toLowerCase().trim(); // Corregido: toLowerCase
    if (texto) {
      resultado = resultado.filter((item) => item.name.toLowerCase().includes(texto));
    }

    //   Filtro 2: por genero
    //   Cada jueguito tiene generos: [{id, name}, etc...]
    //   Revisamos si alguno de sus generos coincide con el ingresado
    if (filtros.value) {
      //.some() devuelve true si al menos uno de los géneros del juego coincide con el seleccionado
      //.find() o .includes() directamente sobre el array de géneros no funcionaría porque estás comparando objetos, no strings :D
      resultado = resultado.filter((item) => item.genres?.some((g) => g.slug === filtros.value));
    }

    return resultado;
  });

  function alEscribir(evento) {
    busqueda.value = evento.target.value;
    sessionStorage.setItem(SESSION_KEY_BUSQUEDA, evento.target.value);
  }

  function setGenero(slug) {
    filtros.value = slug; // Corregido: filtros
    //si no hay un genero escrito borramo la KEY
    if (slug) {
      sessionStorage.setItem(SESSION_GENERO, slug); // Corregido: SESSION_GENERO
    } else {
      sessionStorage.removeItem(SESSION_GENERO); // Corregido: SESSION_GENERO
    }
  }

  // Agregamos la función limpiar que te faltaba declarar para tu botón ✕
  function limpiar() {
    busqueda.value = "";
    sessionStorage.removeItem(SESSION_KEY_BUSQUEDA);
  }

  // Retornamos listaFiltrada con el nombre "listaCompleta"
  return { busqueda, filtros, listaCompleta: listaFiltrada, alEscribir, limpiar, setGenero };
}

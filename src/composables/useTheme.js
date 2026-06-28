import { ref } from "vue";

const STORAGE_KEY = "gameexplorer_tema";

// Estado global compartido entre todos los que usen el composable
const temaOscuro = ref(localStorage.getItem(STORAGE_KEY) !== "claro");

// Aplicar el tema al <html> inmediatamente
function aplicarTema(oscuro) {
  document.documentElement.setAttribute("data-tema", oscuro ? "oscuro" : "claro");
  localStorage.setItem(STORAGE_KEY, oscuro ? "oscuro" : "claro");
}

// Aplicar al cargar
aplicarTema(temaOscuro.value);

export function useTheme() {
  function cambioTema() {
    temaOscuro.value = !temaOscuro.value;
    aplicarTema(temaOscuro.value);
  }

  return { temaOscuro, cambioTema };
}

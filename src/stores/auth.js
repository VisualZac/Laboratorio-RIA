import { defineStore } from "pinia";
import { ref } from "vue";

const SESSION_KEY = "gameexplorer_usuario";

function cargarUsuario() {
  const guardado = sessionStorage.getItem(SESSION_KEY);
  return guardado ? JSON.parse(guardado) : null;
}

export const useAuthStore = defineStore("auth", () => {
  const usuario = ref(cargarUsuario());

  function login(nombre, password) {
    if (nombre === "pablo" && password === "1234") {
      usuario.value = {
        nombre: "pablo",
        rol: "usuario",
      };

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(usuario.value));
      return true;
    }

    return false;
  }

  function logout() {
    usuario.value = null;
    sessionStorage.removeItem(SESSION_KEY);
  }

  return { usuario, login, logout };
});

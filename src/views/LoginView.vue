<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const router = useRouter();

const nombre = ref("");
const password = ref("");
const error = ref("");

function ingresar() {
  console.log("Intentando login", nombre.value, password.value);

  const ok = auth.login(nombre.value, password.value);

  console.log("Resultado login", ok);
  console.log(
    "Session storage:",
    sessionStorage.getItem("gameexplorer_usuario")
  );

  if (ok) {
    router.push("/");
  } else {
    error.value = "Usuario o contraseña incorrectos";
  }
}
</script>

<template>
  <main class="login contenedor">
    <section class="login__card">
      <h1 class="login__titulo">Iniciar sesión</h1>

      <label class="login__label">
        Usuario
        <input
          v-model="nombre"
          class="login__input"
          placeholder="pablo"
        />
      </label>

      <label class="login__label">
        Contraseña
        <input
          v-model="password"
          class="login__input"
          type="password"
          placeholder="1234"
        />
      </label>

      <button class="login__button" @click="ingresar">
        Entrar
      </button>

      <p v-if="error" class="login__error">{{ error }}</p>
    </section>
  </main>
</template>

<style scoped>
.login {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login__card {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 1rem;
}

.login__titulo {
  margin-bottom: 1.5rem;
  color: var(--color-texto);
  text-align: center;
}

.login__label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  color: var(--color-texto);
}

.login__input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-borde);
  border-radius: 0.5rem;
  background-color: transparent;
  color: var(--color-texto);
}

.login__button {
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--color-acento);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.login__error {
  margin-top: 1rem;
  color: #ff6b6b;
  text-align: center;
}
</style>

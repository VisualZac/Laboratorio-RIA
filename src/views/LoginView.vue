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
  const ok = auth.login(nombre.value, password.value);
  if (ok) {
    router.push("/");
  } else {
    error.value = "Usuario o contraseña incorrectos";
  }
}
</script>

<template>
  <!-- "contenedor" es una utilidad global de layout, no parte del bloque login -->
  <main class="login contenedor">
    <section class="login__tarjeta">
      <h1 class="login__titulo">Iniciar sesión</h1>

      <label class="login__campo">
        Usuario
        <input v-model="nombre" class="login__input" placeholder="pablo" />
      </label>

      <label class="login__campo">
        Contraseña
        <input v-model="password" class="login__input" type="password" placeholder="1234" />
      </label>

      <button class="login__boton" @click="ingresar">Entrar</button>

      <p v-if="error" class="login__error">{{ error }}</p>
    </section>
  </main>
</template>

<style scoped>
/* Block: login */
.login {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Element: tarjeta */
.login__tarjeta {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  background-color: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-lg);
}

/* Element: titulo */
.login__titulo {
  margin-bottom: 1.5rem;
  color: var(--color-texto);
  text-align: center;
}

/* Element: campo (antes "label" — nombre semántico BEM) */
.login__campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
  color: var(--color-texto);
}

/* Element: input */
.login__input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-md);
  background-color: transparent;
  color: var(--color-texto);
  outline: none;
  transition: border-color 200ms ease;
}

.login__input:focus {
  border-color: var(--color-acento);
}

/* Element: boton */
.login__boton {
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: var(--radio-md);
  background-color: var(--color-acento);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 200ms ease;
}

.login__boton:hover {
  opacity: 0.85;
}

/* Element: error */
.login__error {
  margin-top: 1rem;
  color: #ff6b6b;
  text-align: center;
  font-size: 0.875rem;
}
</style>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useTheme } from "@/composables/useTheme.js";
import { useFavoritesStore } from "@/stores/favorites.js";
import { useAuthStore } from "@/stores/auth";

const { temaOscuro, cambioTema } = useTheme();
const favStore = useFavoritesStore();
const auth = useAuthStore();
const router = useRouter();

function cerrarSesion() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <header class="navbar">
    <div class="contenedor navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo">
        <span class="navbar__logo-icono">◈</span>
        <span class="navbar__logo-texto">Game<strong>Explorer</strong></span>
      </RouterLink>

      <!-- Links -->
      <nav class="navbar__nav">
        <RouterLink to="/" class="navbar__link" active-class="navbar__link--activo" exact>
          Inicio
        </RouterLink>

        <RouterLink to="/favoritos" class="navbar__link" active-class="navbar__link--activo">
          Favoritos
          <span v-if="favStore.favorites.length > 0" class="navbar__badge">
            {{ favStore.favorites.length }}
          </span>
        </RouterLink>

        <!-- Usuario logueado -->
        <span v-if="auth.usuario" class="navbar__usuario"> 👤 {{ auth.usuario.nombre }} </span>
        <button v-if="auth.usuario" class="navbar__link navbar__button" @click="cerrarSesion">
          Salir
        </button>
        <RouterLink v-else to="/login" class="navbar__link" active-class="navbar__link--activo">
          Login
        </RouterLink>

        <!-- Toggle tema -->
        <button
          class="navbar__tema"
          @click="cambioTema"
          :title="temaOscuro ? 'Modo claro' : 'Modo oscuro'"
        >
          {{ temaOscuro ? "☀️" : "🌙" }}
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(13, 15, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-borde);
  height: 60px;
}

[data-tema="claro"] .navbar {
  background-color: rgba(244, 244, 248, 0.85);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  transition: opacity 150ms ease;
}

.navbar__logo:hover {
  opacity: 0.8;
}

.navbar__logo-icono {
  color: var(--color-acento);
  font-size: 1.3rem;
}

.navbar__logo-texto strong {
  color: var(--color-acento);
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.navbar__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radio-md);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-texto-suave);
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

.navbar__button {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

.navbar__link:hover {
  color: var(--color-texto);
  background-color: var(--color-superficie);
}

.navbar__link--activo {
  color: var(--color-acento);
  background-color: rgba(108, 99, 255, 0.12);
}

.navbar__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background-color: var(--color-acento);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1;
}

.navbar__usuario {
  font-size: 0.85rem;
  color: var(--color-texto-suave);
  padding: 0.4rem 0.5rem;
}

.navbar__tema {
  background: none;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio-md);
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 150ms ease;
  margin-left: 0.25rem;
}

.navbar__tema:hover {
  border-color: var(--color-acento);
}

@media (max-width: 480px) {
  .navbar__inner {
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    height: auto;
    padding: 0.5rem 0;
  }
}
</style>

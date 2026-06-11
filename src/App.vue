<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0d0f14;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.app-container {
  min-height: 100vh;
  padding: 0 2rem;
}
</style>

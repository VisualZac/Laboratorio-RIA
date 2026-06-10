<script setup lang="ts">
import TheNavbar from './components/layout/TheNavbar.vue'
import TheFooter from './components/layout/TheFooter.vue'

</script>

<template>
   <TheNavbar />

   <main class="app-main">
     <RouterView />
   </main>
  <TheFooter />

</template>

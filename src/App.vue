<script setup>
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import OfflineBanner from "@/components/ui/OfflineBanner.vue";
</script>

<template>
  <TheNavbar />
  <main class="app-main">
    <RouterView />
  </main>
  <TheFooter />
  <OfflineBanner />
</template>

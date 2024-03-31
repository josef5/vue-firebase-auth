<script setup lang="ts">
import { onMounted } from "vue";
import { useStoreAuth } from "./stores/storeAuth";
import Navbar from "./components/layout/Navbar.vue";

const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>

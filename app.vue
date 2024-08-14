<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuth } from "@/composables/useAuth";

const { loadAuth } = useAuth();

onMounted(() => {
  console.log("App is mounted");
  loadAuth();
});
</script>

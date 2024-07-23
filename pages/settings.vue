<template>
  <div>
    <PageHeader />
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from "@/stores/page";

const pageStore = usePageStore();
pageStore.setPageTitle("SETTINGS");
</script>

<style>

</style>
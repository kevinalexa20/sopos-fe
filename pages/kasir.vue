<template>
  <div>
    <PageHeader />
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from "@/stores/page";

const pageStore = usePageStore();
pageStore.setPageTitle("POS");
</script>

<style></style>

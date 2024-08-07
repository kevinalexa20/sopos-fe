<template>
  <div class="flex gap-4 flex-row sm:flex-row bg">
    <div
      class="min-h-[50px] rounded-lg text-2xl flex-1 flex items-center justify-start">
      {{ pageStore.pageTitle }}
    </div>

    <div class="min-h-[50px] rounded-lg flex-1 flex items-center justify-end">
      <DatePicker />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePageStore } from "@/stores/page";
import { storeToRefs } from "pinia";

const pageStore = usePageStore();
const { pageTitle }: storeToRefs<ReturnType<typeof usePageStore>> = pageStore;
</script>

<style></style>

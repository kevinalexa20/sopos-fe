<template>
  <div>
    <PageHeader />

    <div class="my-5 font-rakkas text-5xl">Login</div>

    <div class="my-5">Select your profile</div>
    <div class="my-2 rounded-md border px-4 py-3 text-sm">Kuys</div>
    <div class="rounded-md border px-4 py-3 text-sm">Danzel</div>
    <div class="my-2 rounded-md border px-4 py-3 text-sm">Desmon</div>

    <div>Enter your pin</div>
    <div class="my-2">
      <PinInput
        id="pin-input"
        v-model="value"
        placeholder="○"
        @complete="handleComplete">
        <PinInputGroup>
          <PinInputInput v-for="(id, index) in 5" :key="id" :index="index" />
        </PinInputGroup>
      </PinInput>
    </div>

    <!-- Button to sign in -->
    <div class="my-5">
      <Button size="lg">Sign In</Button>
    </div>

    <!-- ask and throw to register page if doesnt have a profile -->
    <div class="">Don't have a profile?</div>
    <div class="">
      <NuxtLink to="/register" class="text-accent-foreground"
        >Register here</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from "@/stores/page";

const pageStore = usePageStore();
pageStore.setPageTitle("LOGIN");

import { ref } from "vue";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";

const value = ref<string[]>([]);
const handleComplete = (e: string[]) => alert(e.join(""));
</script>

<style></style>

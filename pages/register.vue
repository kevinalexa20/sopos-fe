<template>
  <div>
    <PageHeader />

    <div class="my-5 font-rakkas text-5xl">Register.</div>

    <Input class="my-2" type="email" placeholder="Email" />
    <Input class="my-2" type="email" placeholder="Password" />
    <Input class="my-2" type="email" placeholder="Confirm Password" />
    <!-- button to register -->
    <div class="my-5">
      <Button size="lg">Register</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from "@/stores/page";

const pageStore = usePageStore();
pageStore.setPageTitle("REGISTER");

import { Input } from "@/components/ui/input";
</script>

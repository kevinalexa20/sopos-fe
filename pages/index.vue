<template>
  <div>
    <PageHeader />

    <!-- Greeting Employee -->

    <div class="my-5 font-rakkas text-5xl">Hi, Kuys.</div>

    <div class="my-5">Order Monitoring</div>
    <!-- Grid about order monitoring -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        Total Order Today
      </div>
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        On Proccess
      </div>
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        Pending Orders
      </div>
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        Cancelled Orderst
      </div>
    </div>

    <div class="my-5">Daily Sales Report</div>
    <!-- Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        Total Order Today
      </div>
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        On Proccess
      </div>
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        Pending Orders
      </div>
      <div class="min-h-[100px] rounded-lg bg-slate-500 shadow">
        Most Item Ordered
      </div>
    </div>

    <!-- Latest transaction with refresh button -->
    <div class="my-5 flex gap-4 flex-row sm:flex-row">
      <div class="flex-1 flex items-center">Latest Transactions</div>
      <div class="flex">
        <Button variant="outline" size="icon">
          <RefreshCcw class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <!-- Table of latest transactions -->
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from "@/stores/page";

const pageStore = usePageStore();
pageStore.setPageTitle("DASHBOARD");

import { RefreshCcw } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
</script>

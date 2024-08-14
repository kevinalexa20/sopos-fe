<template>
  <div>
    <PageHeader />

    <!-- Greeting Employee -->
    <div class="flex justify-between">
      <div v-if="isAuthenticated" class="my-5 font-rakkas text-5xl">
        Hi, {{ currentEmployeeName }}.
      </div>
      <div v-else class="my-5 font-rakkas text-5xl">Welcome, Guest.</div>
      <!-- <Button size="lg" @click="handleLogout">Logout</Button> -->
      <div class="my-5">
        <Button v-if="isAuthenticated" size="lg" @click="handleLogout"
          >Logout</Button
        >
        <Button v-else size="lg" @click="navigateToLogin">Login</Button>
      </div>
    </div>

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
import { computed } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { isAuthenticated, getCurrentEmployeeName, logout, loadAuth } = useAuth();
const router = useRouter();

const currentEmployeeName = computed(() => {
  const name = getCurrentEmployeeName.value;
  console.log("Current employee name in dashboard:", name);
  return name || "Employee";
});

onMounted(() => {
  loadAuth(); // manggil loadAuth di sini juga
});

const handleLogout = async () => {
  try {
    await logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const navigateToLogin = () => {
  router.push("/login");
};

const pageStore = usePageStore();
pageStore.setPageTitle("DASHBOARD");
</script>

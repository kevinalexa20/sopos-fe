<template>
  <div>
    <PageHeader />

    <div class="my-5">Select your profile</div>
    <div
      v-for="employee in employees"
      :key="employee.id"
      class="my-2 rounded-md border px-4 py-3 text-sm cursor-pointer"
      @click="selectEmployee(employee)">
      {{ employee.email || "No Email" }}
    </div>

    <div v-if="selectedEmployee" class="mt-5">
      <div>Enter your password</div>
      <Input
        v-model="password"
        type="password"
        placeholder="Password"
        class="my-2" />

      <!-- Button to sign in -->
      <div class="my-5">
        <Button size="lg" @click="handleLogin">Sign In</Button>
      </div>
    </div>

    <!-- ask and throw to register page if doesn't have a profile -->
    <div v-else class="">Don't have a profile?</div>
    <div class="">
      <NuxtLink to="/register" class="text-accent-foreground"
        >Register here</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const { getPublicEmployees, login } = useAuth();
const router = useRouter();
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string; // Pastikan untuk menyertakan properti yang dibutuhkan
}

const employees = ref<Employee[]>([]); // Menggunakan array of Employee
const selectedEmployee = ref<Employee | null>(null); // Menggunakan Employee atau null
const password = ref("");
const error = ref("");

onMounted(async () => {
  try {
    employees.value = await getPublicEmployees();
    console.log("Employees:", employees.value);
  } catch (error) {
    console.error("Failed to fetch employees:", error);
  }
});

const selectEmployee = (employee: Employee) => {
  selectedEmployee.value = employee;
};

const handleLogin = async () => {
  if (!selectedEmployee.value?.email) {
    console.log("Employee email:" + selectedEmployee.value?.email);
    error.value = "Please select an employee.";
    console.error("Please select an employee.");
    return;
  }

  if (!password.value) {
    error.value = "Please enter your password.";
    return;
  }

  error.value = ""; // Reset error message

  try {
    await login({
      email: selectedEmployee.value.email,
      password: password.value,
    });
    router.push("/"); // Redirect to dashboard after successful login
  } catch (err) {
    console.error("Login failed:", err);
    if (err instanceof Error) {
      error.value =
        err.message ||
        "Login failed. Please check your credentials and try again.";
    } else {
      error.value = "An unexpected error occurred. Please try again.";
    }
  }
};
</script>

<template>
  <div>
    <PageHeader />

    <div class="my-5 font-rakkas text-5xl">Register.</div>

    <Input v-model="email" type="email" placeholder="Email" class="my-2" />
    <Input
      v-model="password"
      type="password"
      placeholder="Password"
      class="my-2" />
    <Input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      class="my-2" />
    <Input
      v-model="firstName"
      type="text"
      placeholder="First Name"
      class="my-2" />
    <Input
      v-model="lastName"
      type="text"
      placeholder="Last Name"
      class="my-2" />

    <!-- button to register -->
    <div class="my-5">
      <Button size="lg" @click="handleRegister">Register</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageStore } from "@/stores/page";
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router"; // Import useRouter for navigation
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const pageStore = usePageStore();
pageStore.setPageTitle("REGISTER");

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");

const { register } = useAuth();
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    console.error("Passwords do not match");
    // Display error message to the user
    return;
  }

  try {
    await register({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });
    // Redirect to login page after successful registration
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    // Display error message to the user
  }
};
</script>

<style scoped>
/* Pertahankan atau sesuaikan dengan styling Anda */
</style>

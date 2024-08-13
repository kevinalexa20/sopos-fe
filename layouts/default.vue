<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 w-full border-b border-secondary bg-background">
      <div
        class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div @click="toggleSidebar" class="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div class="flex gap-6 md:gap-10">
          <h2 class="text-lg font-bold">SoPOS</h2>
        </div>
        <div class="flex flex-1 items-center justify-end space-x-4">
          <ColorModeToggle />
        </div>
      </div>
    </header>

    <!-- Main content area -->
    <div class="flex-1 flex">
      <!-- Sidebar navigation -->
      <aside
        :class="[
          'md:flex w-64 flex-col border-r border-secondary bg-background',
          sidebarOpen ? 'block' : 'hidden',
          'md:block',
        ]">
        <nav class="flex-1 space-y-1 py-4">
          <NuxtLink
            to="/"
            class="flex items-center px-4 py-2 text-lg font-medium group text-gray-500 hover:bg-transparent hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground">
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/kasir"
            class="flex items-center px-4 py-2 text-lg font-medium group text-gray-500 hover:bg-transparent hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground">
            Menu
          </NuxtLink>

          <NuxtLink
            to="/login"
            class="flex items-center px-4 py-2 text-lg font-medium group text-gray-500 hover:bg-transparent hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground">
            Login
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="flex items-center px-4 py-2 text-lg font-medium group text-gray-500 hover:bg-transparent hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground">
            Register
          </NuxtLink>
          <NuxtLink
            to="/settings"
            class="flex items-center px-4 py-2 text-lg font-medium group text-gray-500 hover:bg-transparent hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground">
            Settings
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// State untuk mengontrol visibilitas sidebar
const sidebarOpen = ref(false);

// Fungsi untuk toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

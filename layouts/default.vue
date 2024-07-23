<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 w-full border-b border-secondary bg-background">
      <div
        class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div class="flex gap-6 md:gap-10">
          <h2 class="text-lg font-bold">SoPOS</h2>
        </div>
        <div class="flex flex-1 items-center justify-end space-x-4">
          <!-- Add user menu or other header content here -->
          <ColorModeToggle />
        </div>
      </div>
    </header>

    <!-- Main content area -->
    <div class="flex-1 flex">
      <!-- Sidebar navigation -->
      <aside
        class="hidden md:flex w-64 flex-col border-r border-secondary bg-background">
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
// You can add any necessary imports or logic here
const router = useRouter();

const goToKasir = () => {
  router.push("/kasir");
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  //load auth data when the app starts
  if (process.client) {
    authStore.loadAuth();
  }

  //add hook to check auth status before each route
  // addRouteMiddleware(
  //   "auth",
  //   () => {
  //     if (!authStore.token) {
  //       return navigateTo("/login");
  //     }
  //   },
  //   { global: true }
  // );
});

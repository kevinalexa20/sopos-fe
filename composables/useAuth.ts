import { useAuthStore } from "@/stores/auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    try {
      await authStore.login(credentials);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      await authStore.register(userData);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authStore.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const checkAuth = async () => {
    if (!authStore.user) {
      await authStore.fetchUser();
    }
    return !!authStore.user;
  };

  return {
    user: computed(() => authStore.user),
    login,
    register,
    logout,
    checkAuth,
  };
}

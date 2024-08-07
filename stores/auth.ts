import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  user: User;
  token?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async register(userData: RegisterData) {
      try {
        const response = await $fetch<AuthResponse>(
          "http://localhost:3007/api/auth/register",
          {
            method: "POST",
            body: userData,
          }
        );
        if (response && "user" in response) {
          this.user = response.user;
        } else {
          throw new Error("Invalid response from server");
        }
        return response;
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    async login(credentials: LoginCredentials) {
      try {
        const response = await $fetch<AuthResponse>(
          "http://localhost:3007/api/auth/login",
          {
            method: "POST",
            body: credentials,
          }
        );
        if (response && "user" in response) {
          this.user = response.user;
        } else {
          throw new Error("Invalid response from server");
        }
        return response;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    async logout() {
      try {
        await $fetch("http://localhost:3007/api/auth/logout", {
          method: "POST",
        });
        this.user = null;
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    },
    async fetchUser() {
      try {
        const user = await $fetch<User>("http://localhost:3007/api/auth/user", {
          method: "GET",
        });
        if (user && "id" in user) {
          this.user = user;
        } else {
          throw new Error("Invalid user data received");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        this.user = null;
      }
    },
  },
});

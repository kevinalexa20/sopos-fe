import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    employee: null as any | null,
    token: null as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("authToken", token);
    },
    setEmployee(employee: any) {
      this.employee = employee;
    },
    clearAuth() {
      this.employee = null;
      this.token = null;
      localStorage.removeItem("authToken");
    },
    loadToken() {
      this.token = localStorage.getItem("authToken");
    },
  },
});

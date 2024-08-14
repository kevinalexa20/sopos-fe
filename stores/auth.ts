import { defineStore } from "pinia";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    employee: null as Employee | null,
    token: null as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      if (process.client) {
        localStorage.setItem("authToken", token);
      }
      console.log("Token set in store:", token);
    },
    setEmployee(employee: Employee) {
      console.log("Setting employee in store:", employee);
      if (!employee) {
        console.warn("Attempting to set undefined employee");
        return;
      }
      this.employee = employee;
      if (process.client) {
        localStorage.setItem("authEmployee", JSON.stringify(employee));
      }
    },
    clearAuth() {
      this.employee = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem("authEmployee");
        localStorage.removeItem("authToken");
      }
    },
    loadAuth() {
      if (process.client) {
        const storedToken = localStorage.getItem("authToken");
        const storedEmployee = localStorage.getItem("authEmployee");

        if (storedToken) this.token = storedToken;
        if (storedEmployee) this.employee = JSON.parse(storedEmployee);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => {
      console.log("Checking authentication, token:", state.token);
      return !!state.token;
    },
    currentEmployee: (state) => {
      console.log("Getting current employee:", state.employee);
      return state.employee;
    },
    currentEmployeeName: (state) => {
      const name = state.employee ? `${state.employee.firstName}` : "";
      console.log("Getting current employee name:", name);
      return name;
    },
  },
});

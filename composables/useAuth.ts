import { useAuthStore } from "../stores/auth";

// Definisikan interfaces untuk login dan register
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

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string; // Pastikan untuk menyertakan properti yang dibutuhkan
}

export function useAuth() {
  const authStore = useAuthStore();

  const getPublicEmployees = async (): Promise<Employee[]> => {
    try {
      const response = await fetch(
        "http://localhost:3007/api/auth/public/employees",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Raw response from server:", data);

      if (data.success && Array.isArray(data.data)) {
        // Ensure each employee object matches the Employee interface
        return data.data.map((emp: any) => ({
          id: emp.id,
          firstName: emp.firstName || "",
          lastName: emp.lastName || "",
          email: emp.email || "",
        }));
      } else {
        throw new Error("Invalid response format or no employees data");
      }
    } catch (error) {
      console.error("Get Public Employees error:", error);
      throw error;
    }
  };

  const getRegisteredEmployees = async (token: string) => {
    try {
      const responce = await fetch("http://localhost:3007/api/auth/profile", {
        method: "Get",
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      if (!responce.ok) {
        throw new Error("Get Registered Employee failed");
      }
      const employee = await responce.json();
      return employee;
    } catch (error) {
      console.error("Get Registered Employee error:", error);
      throw error;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("http://localhost:3007/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      authStore.setToken(data.token);
      authStore.setEmployee(data.employee);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch("http://localhost:3007/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const responseData = await response.json();
      authStore.setToken(responseData.token);
      authStore.setEmployee(responseData.employee);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3007/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      authStore.clearAuth();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const isAuthenticated = computed(() => !!authStore.token);

  return {
    getPublicEmployees,
    getRegisteredEmployees,
    login,
    register,
    logout,
    isAuthenticated,
    employee: computed(() => authStore.employee),
  };
}

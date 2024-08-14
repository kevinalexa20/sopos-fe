import { useAuthStore } from "../stores/auth";

//interfaces untuk login dan register
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
  email: string;
}

export function useAuth() {
  const authStore = useAuthStore();

  const loadAuth = () => {
    authStore.loadAuth();
  };

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
        method: "GET",
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

  const login = async (credentials: LoginCredentials): Promise<Employee> => {
    try {
      const response = await fetch("http://localhost:3007/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login data received:", result);

      if (result.success && result.data) {
        const { employee, token } = result.data;

        // Simpan token ke localStorage atau state management
        localStorage.setItem("authToken", token);
        // localStorage.setItem("refreshToken", refreshToken);

        return employee;
      } else {
        throw new Error("Invalid response from server");
      }
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

  // const isAuthenticated = computed(() => !!authStore.token);
  const getCurrentEmployee = computed(() => authStore.currentEmployee);
  const getCurrentEmployeeName = computed(() => {
    const employee = authStore.currentEmployee;
    return employee ? `${employee.firstName}` : "";
  });

  return {
    getPublicEmployees,
    getRegisteredEmployees,
    login,
    register,
    logout,
    // isAuthenticated,
    // employee: computed(() => authStore.employee),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    getCurrentEmployee,
    getCurrentEmployeeName,
    loadAuth,
  };
}

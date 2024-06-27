import { create } from "zustand";
import { LoginForm, RegisterForm } from "../utils/types";

interface UserAuth {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

interface UserActions {
  register: (values: RegisterForm) => Promise<void>;
  login: (values: LoginForm) => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserActions & UserAuth>((set) => ({
  email: "",
  password: "",
  isLoggedIn: false,

  // Actions for user authentication
  login: async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      await response.json();
      if (response.status === 202) {
        set({
          email: values.email,
          password: values.password,
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  register: async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      await response.json();
      if (response.status === 201) {
        set({
          email: values.email,
          password: values.password,
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  logout: () => set({ email: "", password: "", isLoggedIn: false }),
}));

export default useUserStore;

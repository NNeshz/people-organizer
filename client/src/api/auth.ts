import { RegisterForm, LoginForm } from "../utils/types";

export async function fetchRegister(registerForm: RegisterForm) {
    try {
        const response = await fetch("http://localhost:3001/api/user/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerForm),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function fetchLogin(loginForm: LoginForm) {
    try {
        const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginForm),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}
"use client";

import { useState } from "react";
import type { User } from "../types/user.types";

interface LoginProps {
    onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState("");

    async function handleLogin() {
        console.log("Login clicked");

        try {
            const response = await fetch(
                "http://localhost:3001/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username }),
                }
            );

            console.log("Status:", response.status);

            const data = await response.json();

            console.log("Response:", data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            onLogin(data);
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <main>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>
        </main>
    );
}
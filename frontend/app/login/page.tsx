"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res: any = await loginUser({ email, password });
      login(res.access_token);
      router.push("/dashboard");
    } catch {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-3">
      
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}
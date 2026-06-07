"use client";

import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    // validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      await registerUser(form);
      router.push("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-3">
      <h1 className="text-2xl font-bold">Register</h1>

      <input
        className="border p-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="border p-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleRegister}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);

    await registerUser(form);

    setLoading(false);
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-3">
      <h1 className="text-2xl font-bold">Register</h1>

      <input
        className="border p-2"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleRegister}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </div>
  );
}
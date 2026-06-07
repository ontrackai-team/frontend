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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-4">
      
      {/* glow background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.35),transparent_60%)]" />

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              Create account
            </h1>
            <p className="text-gray-400 mt-2">
              Join OnTrackAI and start your learning journey
            </p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Name</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Your name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By registering, you agree to our terms
          </p>
        </div>

        {/* floating glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
      </div>
    </div>
  );
}
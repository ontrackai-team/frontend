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

    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await loginUser({ email, password });

login(res.access_token); // IMPORTANT (backend returns this)
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-4">
      
      {/* background glow */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.4),transparent_60%)]" />

      <div className="relative w-full max-w-md">
        
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>
            <p className="text-gray-400 mt-2">
              Login to continue to your dashboard
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">Password</label>
            <input
              className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Secure login • OnTrackAI
          </p>
        </div>

        {/* floating effects */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />
      </div>
    </div>
  );
}
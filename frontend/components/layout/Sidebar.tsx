"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";
import { getMe } from "@/services/authService";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    logout();
    router.push("/");
  };

  return (
    <aside className="relative w-72 h-screen overflow-hidden border-r border-white/10 bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex h-full flex-col p-6">

        {/* USER PROFILE TOP */}
        <div className="mb-8 flex items-center gap-3">

          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-white font-semibold">
              {user?.name || "Loading..."}
            </h2>

            <p className="text-xs text-slate-400">
              {user?.email}
            </p>
          </div>

        </div>

        {/* APP NAME */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">OnTrackAI</h1>
          <p className="text-xs text-slate-400">
            AI Learning Platform
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">

        <Link
  href="/dashboard"
  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white hover:translate-x-1"
>
  <LayoutDashboard size={20} />
  <span className="text-sm font-medium">Dashboard</span>
</Link>

          <Link href="/assessments" className="nav">
            <ClipboardCheck size={20} />
            Assessments
          </Link>

          <Link href="/schedule" className="nav">
            <CalendarDays size={20} />
            Schedules
          </Link>

          <Link href="/chat" className="nav">
            <MessageSquare size={20} />
            AI Chat
          </Link>

          <Link href="/ai-planner" className="nav">
            <Brain size={20} />
            AI Planner
          </Link>

          <Link href="/profile" className="nav">
            <User size={20} />
            Profile
          </Link>

          <Link href="/settings" className="nav">
            <Settings size={20} />
            Settings
          </Link>

        </nav>

        {/* LOGOUT */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>

      {/* reusable style */}
      <style jsx>{`
        .nav {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #cbd5e1;
          transition: 0.2s;
        }

        .nav:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }
      `}</style>

    </aside>
  );
}
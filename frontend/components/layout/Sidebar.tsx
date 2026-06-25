"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = confirm(
      "Are you sure you want to logout?"
    );
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
        
        {/* Logo Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg">
              <Sparkles size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                OnTrackAI
              </h1>
              <p className="text-xs text-slate-400">
                AI Learning Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            <LayoutDashboard
              size={20}
              className="group-hover:scale-110 transition"
            />
            Dashboard
          </Link>

          <Link
            href="/assessments"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            <ClipboardCheck
              size={20}
              className="group-hover:scale-110 transition"
            />
            Assessments
          </Link>

          <Link
            href="/schedule"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            <CalendarDays
              size={20}
              className="group-hover:scale-110 transition"
            />
            Schedules
          </Link>

          <Link
            href="/chat"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            <MessageSquare
              size={20}
              className="group-hover:scale-110 transition"
            />
            AI Assistant Chat
          </Link>
          <Link
          href="/planner"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
         <Brain
           size={20}
           className="group-hover:scale-110 transition"
            />
            AI Planner
        </Link>

          <Link
            href="/settings"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            <Settings
              size={20}
              className="group-hover:scale-110 transition"
            />
            Settings
          </Link>
        </nav>

        {/* Pro Card */}
        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-4 backdrop-blur-xl">
          <h3 className="font-semibold">
            AI Study Assistant
          </h3>
          <p className="mt-2 text-xs text-slate-400">
            Plan schedules, generate assessments, and
            boost productivity with AI.
          </p>
        </div>

        {/* Logout */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3 font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition"
            />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
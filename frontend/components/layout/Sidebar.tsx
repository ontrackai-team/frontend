"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();

const handleLogout = () => {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  logout();
  router.push("/");
};

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-8">
        OnTrackAI
      </h1>

      <nav className="flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="p-3 rounded hover:bg-slate-700"
        >
          Dashboard
        </Link>
            <Link
          href="/assessments"
          className="p-3 rounded hover:bg-slate-700"
        >
          Assessments
        </Link>
        <Link
          href="/schedule"
          className="p-3 rounded hover:bg-slate-700"
        >
          Schedules
        </Link>
        

        

        <Link
          href="/chat"
          className="p-3 rounded hover:bg-slate-700"
        >
          AI Chat
        </Link>
        <Link
          href="/settings"
          className="p-3 rounded hover:bg-slate-700"
        >
          Settings
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 p-3 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
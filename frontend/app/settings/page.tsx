"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { logout } = useAuth();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold">Account</h2>

          <p className="text-sm text-gray-500">
            Token: {token?.slice(0, 20)}...
          </p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

      </div>
    </AppLayout>
  );
}
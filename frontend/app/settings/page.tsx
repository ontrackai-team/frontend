"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-2">
            Manage your account and application preferences.
          </p>
        </div>

        {/* Account */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Account
          </h2>

          <div className="space-y-4">

            <div>
              <label className="text-sm text-slate-400">
                Name
              </label>

              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
                value="John Doe"
                readOnly
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Email
              </label>

              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
                value="john@example.com"
                readOnly
              />
            </div>

            <button className="rounded-xl bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-700">
              Change Password
            </button>

          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Preferences
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white">Notifications</h3>
                <p className="text-sm text-slate-400">
                  Receive study reminders.
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
                className="h-5 w-5"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white">Dark Mode</h3>
                <p className="text-sm text-slate-400">
                  Use dark appearance.
                </p>
              </div>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
                className="h-5 w-5"
              />
            </div>

          </div>
        </div>

        {/* AI */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            AI Assistant
          </h2>

          <p className="text-slate-400 mb-4">
            OnTrackAI currently uses the Gemini AI API to generate study plans
            and answer study-related questions.
          </p>

          <button className="rounded-xl bg-cyan-600 px-5 py-3 hover:bg-cyan-700">
            Test AI Connection
          </button>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6">
          <h2 className="text-xl font-semibold text-red-400">
            Danger Zone
          </h2>

          <p className="text-slate-400 mt-2 mb-5">
            These actions cannot be undone.
          </p>

          <button className="rounded-xl bg-red-600 px-5 py-3 hover:bg-red-700">
            Delete Account
          </button>
        </div>

      </div>
    </AppLayout>
  );
}
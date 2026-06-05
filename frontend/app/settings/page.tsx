"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
   
    <AppLayout>
  <div
    className={`p-6 space-y-6 min-h-screen ${
      darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
    }`}
  >
      <div
      className={`p-6 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
        <h2 className="text-xl font-semibold mb-4">
          Notifications
        </h2>

        <div className="space-y-3">
          <label className="flex justify-between">
            <span>Email Notifications</span>
            <input type="checkbox" />
          </label>

          <label className="flex justify-between">
            <span>Deadline Reminders</span>
            <input type="checkbox" />
          </label>

          <label className="flex justify-between">
            <span>Study Session Alerts</span>
            <input type="checkbox" />
          </label>
        </div>
      </div>
        

         {/* AI Preferences */}
    <div
      className={`p-6 rounded-xl shadow ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
        <h2 className="text-xl font-semibold mb-4">
          AI Preferences
        </h2>

        <div className="space-y-3">
          <label className="flex justify-between">
            <span>Smart Prioritization</span>
            <input type="checkbox" />
          </label>

          <label className="flex justify-between">
            <span>Auto Study Schedule</span>
            <input type="checkbox" />
          </label>

          <label className="flex justify-between">
            <span>Risk Prediction Alerts</span>
            <input type="checkbox" />
          </label>
        </div>
      </div>
        

      {/* Appearance */}
      <div
        className={`p-6 rounded-xl shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">
          Appearance
        </h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="border px-4 py-2 rounded-lg hover:bg-gray-200 text-black"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Account */}
      <div
        className={`p-6 rounded-xl shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">
          Account
        </h2>

        <div className="space-y-3">
          <button className="w-full border rounded-lg p-3 text-left">
            Change Password
          </button>

          <button className="w-full border rounded-lg p-3 text-left">
            Export My Data
          </button>

          <button className="w-full border rounded-lg p-3 text-left text-red-600">
            Delete Account
          </button>
        </div>
      </div>
      
        </div>
    </AppLayout>
  );
}
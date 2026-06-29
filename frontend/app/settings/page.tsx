"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { getMe } from "@/services/authService";
import { getProfile, updateProfile } from "@/services/profile";
import {
  User,
  Mail,
  Target,
  Shield,
  Bell,
  Palette,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [profile, setProfile] = useState({
    bio: "",
    goal: "",
    avatar: "",
    level: "Beginner",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [userData, profileData] = await Promise.all([
        getMe(),
        getProfile(),
      ]);

      setUser(userData);

      setProfile({
        bio: profileData.bio || "",
        goal: profileData.goal || "",
        avatar: profileData.avatar || "",
        level: profileData.level || "Beginner",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      await updateProfile(profile);

      setMessage("Settings saved successfully.");

      await loadData();
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">Loading...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-8 p-8">

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        {message && (
          <div className="rounded-xl bg-green-100 p-4 text-green-700">
            {message}
          </div>
        )}

     

         {/* PROFILE CARD */}

        <div className="rounded-2xl bg-white p-8 shadow">

          <div className="flex items-center gap-6">

            <img
              src={
                profile.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "User"
                )}&background=4f46e5&color=fff`
              }
              alt="Avatar"
              className="h-28 w-28 rounded-full border-4 border-indigo-100 object-cover"
            />

            <div>

              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                {profile.level}
              </span>

            </div>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border p-5">

              <h3 className="mb-2 font-semibold text-gray-700">
                Bio
              </h3>

              <p className="text-gray-600">
                {profile.bio || "No bio added yet."}
              </p>

            </div>

            <div className="rounded-xl border p-5">

              <h3 className="mb-2 font-semibold text-gray-700">
                Goal
              </h3>

              <p className="text-gray-600">
                {profile.goal || "No goal set yet."}
              </p>

            </div>

          </div>

        </div>

        {/* Future Features */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow">

            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <Bell size={20}/>
              Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Email reminders and study notifications.
            </p>

            <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm">
              Coming Soon
            </span>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <Palette size={20}/>
              Theme
            </h3>

            <p className="text-sm text-gray-500">
              Light and Dark mode customization.
            </p>

            <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm">
              Coming Soon
            </span>

          </div>

        </div>

        {/* Security */}

        <div className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold">
            <Shield size={22}/>
            Security
          </h2>

          <button
            disabled
            className="rounded-xl bg-gray-200 px-6 py-3 text-gray-600"
          >
            Change Password (Coming Soon)
          </button>

        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-700"
        >
          <Save size={18}/>
          {saving ? "Saving..." : "Save Settings"}
        </button>

      </div>
    </AppLayout>
  );
}
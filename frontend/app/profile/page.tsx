"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { getProfile, updateProfile } from "@/services/profile";
import { getMe } from "@/services/authService";

export default function ProfilePage() {
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, profileData] = await Promise.all([
        getMe(),
        getProfile(),
      ]);

      setUser({
        name: userData.name || "",
        email: userData.email || "",
      });

      setProfile({
        bio: profileData.bio || "",
        goal: profileData.goal || "",
        avatar: profileData.avatar || "",
        level: profileData.level || "Beginner",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      await updateProfile(profile);

      await loadData();

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">Loading profile...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-8 p-8">

        <h1 className="text-3xl font-bold">
          My Profile
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

        {/* EDIT FORM */}

        <div className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Edit Profile
          </h2>

          <div className="space-y-6">

            <div>

              <label className="mb-2 block font-semibold">
                Bio
              </label>

              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bio: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Goal
              </label>

              <input
                value={profile.goal}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    goal: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Avatar URL
              </label>

              <input
                value={profile.avatar}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    avatar: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Level
              </label>

              <select
                value={profile.level}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    level: e.target.value,
                  })
                }
                className="w-full rounded-xl border p-3"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
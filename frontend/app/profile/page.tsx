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
        name: userData.name,
        email: userData.email,
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

      const res = await updateProfile(profile);

      setProfile({
        bio: res.profile.bio || "",
        goal: res.profile.goal || "",
        avatar: res.profile.avatar || "",
        level: res.profile.level || "Beginner",
      });

      setMessage(res.message);

      await loadData();
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
        <div className="p-6">Loading profile...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        {message && (
          <div className="mb-6 rounded-lg bg-green-100 text-green-700 p-4">
            {message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Header */}
          <div className="flex items-center gap-6 mb-8">

            <img
              src={
                profile.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name)
              }
              className="w-24 h-24 rounded-full object-cover border"
            />

            <div>
              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.email}
              </p>

              <span className="inline-block mt-2 rounded-full bg-indigo-100 px-4 py-1 text-indigo-700 text-sm">
                {profile.level}
              </span>
            </div>

          </div>

          <div className="space-y-6">

            <div>
              <label className="font-semibold block mb-2">
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
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
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
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
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
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
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
                className="w-full rounded-lg border p-3"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}
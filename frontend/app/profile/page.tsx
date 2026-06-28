"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { getProfile, updateProfile } from "@/services/profile";

export default function ProfilePage() {
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
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        bio: data.bio || "",
        goal: data.goal || "",
        avatar: data.avatar || "",
        level: data.level || "Beginner",
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

      setMessage("Profile updated successfully.");
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
        <div className="p-6">
          Loading profile...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        {message && (
          <div className="mb-6 rounded-lg border border-gray-300 bg-gray-100 p-4 text-black">
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Bio
            </label>

            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
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
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
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
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
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
              className="w-full border rounded-lg p-3"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black text-white px-6 py-3 rounded-lg w-full"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>
      </div>
    </AppLayout>
  );
}
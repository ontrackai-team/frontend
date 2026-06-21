"use client";

import { useSchedules } from "@/hooks/useSchedules";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

export default function SchedulePage() {
  const {
    schedules,
    loading,
    addSchedule,
    removeSchedule
  } = useSchedules();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  if (loading) {
    return (
      <AppLayout>
        <p className="p-6">Loading schedules...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        {/* CREATE */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <h2 className="text-xl font-semibold">Create Schedule</h2>

          <input
            className="border p-2 w-full"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="border p-2 w-full"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Duration (mins)"
            onChange={(e) => setDuration(e.target.value)}
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() =>
              addSchedule({
                title,
                date,
                duration: Number(duration),
                status: "pending"
              })
            }
          >
            Add Schedule
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {schedules.map((s: any) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-500">
                  {s.date} • {s.duration} min
                </p>
              </div>

              <button
                onClick={() => removeSchedule(s.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
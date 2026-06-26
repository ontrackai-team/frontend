"use client";

import { useSchedules } from "@/hooks/useSchedules";
import AppLayout from "@/components/layout/AppLayout";

export default function SchedulePage() {
  const { schedules, loading, removeSchedule } = useSchedules();

  if (loading) {
    return (
      <AppLayout>
        <p className="p-6">Loading AI Schedule...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            AI Study Schedule
          </h1>

          <p className="text-gray-600 mt-1">
            Your personalized study plan generated from assessments
          </p>
        </div>

        {/* EMPTY STATE */}
        {schedules.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">
              No AI schedule found yet.
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Go to AI Planner → Generate Study Plan
            </p>
          </div>
        )}

        {/* SCHEDULE LIST */}
        <div className="space-y-3">

          {schedules.map((s: any) => (
            <div
              key={s.id || s._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              {/* LEFT CONTENT */}
              <div>
                <h3 className="font-semibold text-lg">
                  {s.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  📅 {s.date} • ⏱ {s.duration} min • 📌 {s.status}
                </p>
              </div>

              {/* ACTION */}
              <button
                onClick={() => removeSchedule(s.id || s._id)}
                className="text-red-500 hover:text-red-700 text-sm"
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
"use client";

import { useSchedules } from "@/hooks/useSchedules";
import AppLayout from "@/components/layout/AppLayout";

export default function SchedulePage() {
  const { schedules, loading, removeSchedule } = useSchedules();

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

        <h1 className="text-3xl font-bold">
          Your AI Study Schedule
        </h1>

        <p className="text-gray-600">
          Automatically generated from your assessments
        </p>

        <div className="space-y-3">

          {schedules.length === 0 && (
            <p className="text-gray-500">
              No AI schedule generated yet
            </p>
          )}

          {schedules.map((s: any) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {s.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {s.date} • {s.duration} hour(s)
                </p>

                <span className="text-xs text-green-600">
                  {s.status}
                </span>
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
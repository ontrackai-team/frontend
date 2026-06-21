"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useSchedules } from "@/hooks/useSchedules";
import { useAssessments } from "@/hooks/useAssessments";

export default function DashboardPage() {
  const { schedules } = useSchedules();
  const { assessments } = useAssessments();

  const totalTasks = schedules.length + assessments.length;
  const pendingSchedules = schedules.filter((s: any) => s.status === "pending");

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back 👋 Here is your learning overview.
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-gray-500 text-sm">Total Tasks</h3>
            <p className="text-2xl font-bold">{totalTasks}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-gray-500 text-sm">Schedules</h3>
            <p className="text-2xl font-bold">{schedules.length}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-gray-500 text-sm">Pending</h3>
            <p className="text-2xl font-bold">{pendingSchedules.length}</p>
          </div>
        </div>

        {/* UPCOMING SCHEDULES */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Upcoming Study Schedule
          </h2>

          {schedules.length === 0 ? (
            <p className="text-gray-500">No schedules yet.</p>
          ) : (
            <div className="space-y-3">
              {schedules.slice(0, 5).map((s: any) => (
                <div
                  key={s.id}
                  className="border rounded-lg p-3 flex justify-between"
                >
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <p className="text-sm text-gray-500">
                      {s.date} • {s.duration} min
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UPCOMING ASSESSMENTS */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Upcoming Assessments
          </h2>

          {assessments.length === 0 ? (
            <p className="text-gray-500">No assessments yet.</p>
          ) : (
            <div className="space-y-3">
              {assessments.slice(0, 5).map((a: any) => (
                <div key={a.id} className="border rounded-lg p-3">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-gray-500">
                    Due: {a.dueDate || a.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
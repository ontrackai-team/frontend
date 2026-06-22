"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6">
          Loading dashboard...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Overview of your study progress.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Total Assessments</h3>
            <p className="text-3xl font-bold">
              {stats?.total_assessments}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Pending</h3>
            <p className="text-3xl font-bold">
              {stats?.pending}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Completed</h3>
            <p className="text-3xl font-bold">
              {stats?.completed}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Schedules</h3>
            <p className="text-3xl font-bold">
              {stats?.total_schedules}
            </p>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
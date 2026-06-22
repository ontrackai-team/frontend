"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {

  const { stats, loading } =
    useDashboard();

  if (loading) {
    return (
      <AppLayout>
        <p>Loading...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl p-6 shadow">
            <h3>Total Assessments</h3>

            <p className="text-3xl font-bold mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3>Completed</h3>

            <p className="text-3xl font-bold mt-2">
              {stats.completed}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3>Pending</h3>

            <p className="text-3xl font-bold mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3>Upcoming</h3>

            <p className="text-3xl font-bold mt-2">
              {stats.upcoming}
            </p>
          </div>

        </div>

      </div>

    </AppLayout>
  );
}
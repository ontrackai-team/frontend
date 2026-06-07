"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useAssessments } from "@/hooks/useAssessments";

export default function DashboardPage() {
  const { assessments, loading } = useAssessments();

  if (loading) {
    return (
      <ProtectedRoute>
        <AppLayout>
          <main className="flex-1 p-8">
            <p>Loading dashboard...</p>
          </main>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  const total = assessments.length;

  const pending = assessments.filter(
    (a: any) => a.status === "pending"
  ).length;

  const submitted = assessments.filter(
    (a: any) => a.status === "submitted"
  ).length;

  const upcoming = assessments.filter((a: any) => {
    const due = new Date(a.due_date);

    const diff =
      (due.getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24);

    return diff >= 0 && diff <= 7;
  }).length;

  const progress =
    total === 0
      ? 0
      : Math.round((submitted / total) * 100);

  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex-1 p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Track your academic workload and deadlines.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Total Assessments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {total}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Pending Tasks
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {pending}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Upcoming Deadlines
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {upcoming}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">
                Completion Rate
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {progress}%
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Assessment Overview
            </h2>

            {assessments.length === 0 ? (
              <p className="text-gray-500">
                No assessments added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {assessments
                  .slice(0, 5)
                  .map((assessment: any) => (
                    <div
                      key={assessment.id}
                      className="border rounded-lg p-4"
                    >
                      <h3 className="font-semibold">
                        {assessment.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {assessment.course}
                      </p>

                      <p className="text-sm">
                        Due: {assessment.due_date}
                      </p>

                      <p className="text-sm">
                        Status: {assessment.status}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              AI Insights
            </h2>

            <p className="text-gray-500">
              AI-generated workload recommendations
              will appear here.
            </p>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
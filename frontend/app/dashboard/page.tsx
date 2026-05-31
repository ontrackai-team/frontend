"use client";

import { useAssessments } from "@/hooks/useAssessments";

export default function DashboardPage() {
  const { assessments, loading } = useAssessments();

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const total = assessments.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Track your academic workload and deadlines.
        </p>
      </div>

      {/* Overview Cards */}
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
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">
            Upcoming Deadlines
          </p>

          <h2 className="text-3xl font-bold mt-2">
            --
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500 text-sm">
            Risk Alerts
          </p>

          <h2 className="text-3xl font-bold mt-2">
            --
          </h2>
        </div>
      </div>

      {/* Assessment Overview */}
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
            {assessments.slice(0, 5).map((assessment: any) => (
              <div
                key={assessment.id}
                className="border rounded-lg p-4"
              >
                <h3 className="font-semibold">
                  {assessment.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          AI Insights
        </h2>

        <div className="text-gray-500">
          AI-generated workload recommendations
          will appear here.
        </div>
      </div>
    </div>
  );
}
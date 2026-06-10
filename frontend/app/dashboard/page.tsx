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
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-10 w-10 mx-auto mb-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <p className="text-slate-400">Loading dashboard...</p>
            </div>
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
    total === 0 ? 0 : Math.round((submitted / total) * 100);

  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex-1 p-8 space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-screen text-white">

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Track your academic workload, deadlines, and progress with AI insights.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-[1.02] transition">
              <p className="text-slate-400 text-sm">Total Assessments</p>
              <h2 className="text-3xl font-bold mt-2">{total}</h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-[1.02] transition">
              <p className="text-slate-400 text-sm">Pending Tasks</p>
              <h2 className="text-3xl font-bold mt-2 text-yellow-400">
                {pending}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-[1.02] transition">
              <p className="text-slate-400 text-sm">Upcoming Deadlines</p>
              <h2 className="text-3xl font-bold mt-2 text-orange-400">
                {upcoming}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-[1.02] transition">
              <p className="text-slate-400 text-sm">Completion Rate</p>
              <h2 className="text-3xl font-bold mt-2 text-green-400">
                {progress}%
              </h2>
            </div>
          </div>

          {/* Assessments */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Assessment Overview
            </h2>

            {assessments.length === 0 ? (
              <div className="text-slate-400 text-sm">
                No assessments added yet.
              </div>
            ) : (
              <div className="space-y-3">
                {assessments.slice(0, 5).map((assessment: any) => (
                  <div
                    key={assessment.id}
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold group-hover:text-indigo-300 transition">
                          {assessment.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {assessment.course}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          Due: {assessment.due_date}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full border ${
                          assessment.status === "submitted"
                            ? "border-green-500/30 text-green-400 bg-green-500/10"
                            : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                        }`}
                      >
                        {assessment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 backdrop-blur-xl p-6">
            <h2 className="text-xl font-semibold mb-2">
              AI Insights
            </h2>

            <p className="text-slate-300 text-sm">
              AI-generated workload recommendations will appear here based on your deadlines and performance trends.
            </p>

            <div className="mt-4 text-xs text-slate-400">
              ✨ Coming soon: Smart study scheduling + priority predictions
            </div>
          </div>

        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
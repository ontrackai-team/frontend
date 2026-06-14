"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function AIDashboard() {
  // MOCK DATA
  const recommendations = [
    "Focus on Database Systems this week",
    "Complete frontend integration tasks",
    "Revise React + Next.js fundamentals",
  ];

  const timeAnalysis = {
    availableHours: 12,
    recommendedHours: 8,
    message:
      "You should focus on consistent daily study sessions to stay on track.",
  };

  const notifications = [
    "Assignment deadline in 2 days",
    "You have 3 pending assessments",
    "New AI recommendation available",
  ];

  const resources = [
    {
      title: "React Documentation",
      url: "https://react.dev",
    },
    {
      title: "Next.js Learn",
      url: "https://nextjs.org/learn",
    },
    {
      title: "JavaScript Guide (MDN)",
      url: "https://developer.mozilla.org",
    },
  ];

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">🤖 AI Assistant Dashboard</h1>
            <p className="text-slate-400">
              Your smart study assistant with insights and recommendations
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Study Recommendations */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h2 className="text-xl font-semibold mb-3">
                📊 Study Recommendations
              </h2>
              <ul className="space-y-2 text-slate-300">
                {recommendations.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Time Analysis */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h2 className="text-xl font-semibold mb-3">
                ⏰ Time Analysis
              </h2>
              <p className="text-slate-300">
                Available Hours:{" "}
                <span className="text-white font-semibold">
                  {timeAnalysis.availableHours}h
                </span>
              </p>
              <p className="text-slate-300">
                Recommended Hours:{" "}
                <span className="text-white font-semibold">
                  {timeAnalysis.recommendedHours}h
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {timeAnalysis.message}
              </p>
            </div>

            {/* Notifications */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h2 className="text-xl font-semibold mb-3">
                🔔 Smart Notifications
              </h2>
              <ul className="space-y-2 text-slate-300">
                {notifications.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <h2 className="text-xl font-semibold mb-3">
                📚 Recommended Resources
              </h2>
              <ul className="space-y-2">
                {resources.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-cyan-400 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
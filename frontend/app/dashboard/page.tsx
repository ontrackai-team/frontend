"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useDashboard } from "@/hooks/useDashboard";
import { useEffect, useState } from "react";
import { getTodaySchedules, getAIAdvice } from "@/services/dashboardService";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  const [schedules, setSchedules] = useState<any[]>([]);
  const [aiTip, setAiTip] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTodaySchedules();
        setSchedules(data.slice(0, 3)); // show top 3
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const handleAIAdvice = async () => {
    try {
      const res = await getAIAdvice(
        "Give me today's study advice based on my schedule and assessments"
      );

      setAiTip(res.reply);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <p>Loading...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-8">

        {/* TITLE */}
        <h1 className="text-3xl font-bold">
          AI Dashboard 🚀
        </h1>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Completed</h3>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Pending</h3>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Upcoming</h3>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
        </div>

        {/* SCHEDULE SECTION */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">
            Today's Study Plan 📅
          </h2>

          {schedules.length === 0 ? (
            <p className="text-gray-500">
              No tasks today
            </p>
          ) : (
            schedules.map((s, i) => (
              <div key={i} className="border-b py-2">
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-gray-500">
                  {s.date} • {s.duration} min
                </p>
              </div>
            ))
          )}
        </div>

        {/* AI INSIGHT SECTION */}
        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <h2 className="text-xl font-bold">
            AI Study Advice 🤖
          </h2>

          <button
            onClick={handleAIAdvice}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Generate Advice
          </button>

          {aiTip && (
            <p className="mt-3 text-gray-700">
              {aiTip}
            </p>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
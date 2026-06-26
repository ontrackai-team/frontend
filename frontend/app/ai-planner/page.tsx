"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { createStudyPlan } from "@/services/aiPlanner";

type PlanItem = {
  id?: string;
  title: string;
  date: string;
  duration: number;
  status?: string;
};

export default function AIPlannerPage() {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await createStudyPlan();

      // backend returns:
      // { message: "...", plan: saved[] }
      setPlan(res.plan || []);
    } catch (err) {
      console.error(err);
      setError("Failed to generate study plan. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold">
          AI Study Planner
        </h1>

        <p className="text-gray-600">
          Generate AI-powered study plan from your assessments
        </p>

        {/* BUTTON */}
        <div className="bg-white p-4 rounded shadow">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Generating Plan..." : "Generate Study Plan"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">
            AI is generating your study schedule...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && plan.length === 0 && (
          <p className="text-gray-400">
            No study plan generated yet.
          </p>
        )}

        {/* PLAN LIST (FROM MONGO SCHEDULES) */}
        <div className="space-y-3">
          {plan.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.date} • {item.duration} hour(s)
              </p>

              <span className="text-xs text-green-600">
                {item.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { createStudyPlan } from "@/services/aiPlanner";

export default function AIPlannerPage() {
  const [plan, setPlan] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      // backend now generates plan from assessments (NO INPUTS NEEDED)
      const res = await createStudyPlan();

      setPlan(res.plan);
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
          Generate a smart study plan from your saved assessments
        </p>

        {/* BUTTON ONLY (NO INPUTS ANYMORE) */}
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

        {/* RESULT */}
        <div className="bg-white p-4 rounded shadow min-h-[200px]">
          {loading && (
            <p className="text-gray-500">
              AI is thinking... generating your study plan 🚀
            </p>
          )}

          {!loading && !plan && (
            <p className="text-gray-400">
              Your generated study plan will appear here.
            </p>
          )}

          {/* AI OUTPUT */}
          {plan && (
            <pre className="whitespace-pre-wrap text-sm">
              {plan}
            </pre>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { createStudyPlan } from "@/services/aiPlanner";
import { useRouter } from "next/navigation";

export default function AIPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerate = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await createStudyPlan();

    if (res.success === false) {
      setError(res.message);
      return;
    }

    router.push("/schedule");
  } catch (err) {
    console.error(err);
    setError("Failed to generate study plan.");
  } finally {
    setLoading(false);
  }
};

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        <h1 className="text-3xl font-bold">
          AI Study Planner
        </h1>

        <p className="text-gray-600">
          Generate AI study plan from your assessments
        </p>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        <p className="text-gray-400">
          After generation, your schedule page will update automatically.
        </p>

      </div>
    </AppLayout>
  );
}
"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { generateStudyPlan } from "@/services/aiPlanner";

export default function AIPlannerPage() {
  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await generateStudyPlan();
    setPlan(res.plan);
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">

        <h1 className="text-3xl font-bold">AI Study Planner</h1>

        <button
          onClick={handleGenerate}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Generate Plan
        </button>

        {loading && <p className="text-gray-500">Generating...</p>}

        <div className="space-y-3">
          {plan.map((p, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">
                {p.date} • {p.suggested_time}
              </p>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
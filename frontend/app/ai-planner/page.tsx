"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { createStudyPlan } from "@/services/aiPlanner";

export default function AIPlannerPage() {
  const [subject, setSubject] = useState("");
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);

  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await createStudyPlan(
        subject,
        daysLeft,
        hoursPerDay
      );

      // Gemini returns STRING → convert to JSON safely
      const parsed =
        typeof res.plan === "string"
          ? JSON.parse(res.plan)
          : res.plan;

      setPlan(parsed);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate study plan. Check backend response.");
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

        {/* INPUTS */}
        <div className="bg-white p-4 rounded shadow space-y-3">

          <input
            className="border p-2 w-full"
            placeholder="Subject (e.g. Mathematics)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Days Left"
            value={daysLeft}
            onChange={(e) =>
              setDaysLeft(Number(e.target.value))
            }
          />

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Hours per Day"
            value={hoursPerDay}
            onChange={(e) =>
              setHoursPerDay(Number(e.target.value))
            }
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !subject}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* RESULTS */}
        <div className="space-y-3">

          {plan.length === 0 && !loading && (
            <p className="text-gray-500">
              No study plan generated yet.
            </p>
          )}

          {plan.map((p: any, i: number) => (
            <div
              key={i}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold">
                {p.title}
              </h3>

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
"use client";

import { useAssessments } from "@/hooks/useAssessments";

export default function SchedulePage() {
  const { assessments, loading } = useAssessments();

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Study Schedule
        </h1>

        <p className="text-gray-500 mt-1">
          Organize your study sessions and
          upcoming assessments.
        </p>
      </div>

      {/* AI Schedule */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            AI Study Planner
          </h2>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Generate Schedule
          </button>
        </div>

        <p className="text-gray-500 mt-3">
          Personalized study plans will be
          generated based on assessment deadlines.
        </p>
      </div>

      {/* Upcoming Work */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Upcoming Assessments
        </h2>

        {assessments.length === 0 ? (
          <p className="text-gray-500">
            No assessments available.
          </p>
        ) : (
          <div className="space-y-3">
            {assessments.map((assessment: any) => (
              <div
                key={assessment.id}
                className="border rounded-lg p-4"
              >
                <h3 className="font-medium">
                  {assessment.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Planner */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Weekly Planner
        </h2>

        <div className="grid md:grid-cols-7 gap-4">
          {[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ].map((day) => (
            <div
              key={day}
              className="border rounded-lg p-4 min-h-[120px]"
            >
              <h3 className="font-semibold mb-2">
                {day}
              </h3>

              <p className="text-sm text-gray-400">
                No tasks
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
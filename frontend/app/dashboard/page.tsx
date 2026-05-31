"use client";
import DashboardStats from "@/components/dashboard/DashboardStats";
import AssessmentCard from "@/components/assessment/AssessmentCard";
import { useAssessments } from "@/hooks/useAssessments";

export default function DashboardPage() {
  const { assessments, loading } = useAssessments();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
          />
        ))}
      </div>
    </div>
  );
}
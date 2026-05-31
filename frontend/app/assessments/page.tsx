"use client";

import { useAssessments } from "@/hooks/useAssessments";
import AddAssessmentForm from "@/components/assessment/AddAssessmentForm";
import AssessmentTable from "@/components/assessment/AssessmentTable";

export default function AssessmentsPage() {
  const { assessments, loading, fetchAssessments } = useAssessments();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Assessments</h1>

      {/* ADD FORM */}
      <AddAssessmentForm onSuccess={fetchAssessments} />

      {/* TABLE */}
      <AssessmentTable
        assessments={assessments}
        onDelete={fetchAssessments}
      />
    </div>
  );
}
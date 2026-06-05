"use client";

import { useAssessments } from "@/hooks/useAssessments";
import AddAssessmentForm from "@/components/assessment/AddAssessmentForm";
import AssessmentTable from "@/components/assessment/AssessmentTable";
import AppLayout from "@/components/layout/AppLayout";

export default function AssessmentsPage() {
  const { assessments, loading, fetchAssessments } = useAssessments();

  if (loading) return <p>Loading...</p>;

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold">Assessments</h1>

      {/* ADD FORM */}
      <AddAssessmentForm onSuccess={fetchAssessments} />

      {/* TABLE */}
      <AssessmentTable
        assessments={assessments}
        onDelete={fetchAssessments}
      />
    </AppLayout>
  );
}
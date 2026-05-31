import AssessmentTable from "@/components/assessment/AssessmentTable";
import { mockAssessments } from "@/data/mockAssessments";

export default function AssessmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Assessments
      </h1>

      <AssessmentTable
        assessments={mockAssessments}
      />
    </div>
  );
}
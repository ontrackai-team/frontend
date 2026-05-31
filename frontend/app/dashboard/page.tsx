import DashboardStats from "@/components/dashboard/DashboardStats";
import AssessmentCard from "@/components/assessment/AssessmentCard";
import { mockAssessments } from "@/data/mockAssessments";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <DashboardStats
        total={3}
        pending={2}
        submitted={1}
        overdue={0}
      />

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {mockAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
          />
        ))}
      </div>
    </div>
  );
}
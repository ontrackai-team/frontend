import { Assessment } from "@/types/assessment";
import StatusBadge from "./StatusBadge";

type Props = {
  assessment: Assessment;
};

export default function AssessmentCard({ assessment }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <h3 className="text-lg font-bold">{assessment.title}</h3>

      <p className="text-gray-600">{assessment.course}</p>

      <p className="mt-2">
        Weight: <strong>{assessment.weight}%</strong>
      </p>

      <p>
        Due: {new Date(assessment.due_date).toLocaleDateString()}
      </p>

      <div className="mt-3">
        <StatusBadge status={assessment.status} />
      </div>
    </div>
  );
}
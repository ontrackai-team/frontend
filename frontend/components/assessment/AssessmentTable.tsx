import { Assessment } from "@/types/assessment";
import StatusBadge from "./StatusBadge";

type Props = {
  assessments: Assessment[];
};

export default function AssessmentTable({
  assessments,
}: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Course</th>
            <th className="p-4 text-left">Weight</th>
            <th className="p-4 text-left">Due Date</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {assessments.map((assessment) => (
            <tr key={assessment.id} className="border-t">
              <td className="p-4">{assessment.title}</td>
              <td className="p-4">{assessment.course}</td>
              <td className="p-4">{assessment.weight}%</td>
              <td className="p-4">
                {new Date(
                  assessment.due_date
                ).toLocaleDateString()}
              </td>
              <td className="p-4">
                <StatusBadge status={assessment.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
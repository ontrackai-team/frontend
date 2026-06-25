import { deleteAssessment } from "@/services/assessmentService";

export default function AssessmentTable({
  assessments,
  onDelete,
}: any) {
  const handleDelete = async (id: string) => {
    await deleteAssessment(id);
    onDelete();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Subject</th>
            <th className="text-left p-3">Priority</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {assessments.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No assessments found.
              </td>
            </tr>
          ) : (
            assessments.map((a: any) => (
              <tr key={a.id} className="border-b">
                <td className="p-3">{a.title}</td>

                <td className="p-3">{a.subject}</td>

                <td className="p-3">{a.priority}</td>

                <td className="p-3">{a.status}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
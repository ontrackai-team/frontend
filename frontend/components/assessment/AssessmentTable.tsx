import { deleteAssessment } from "@/services/api";

export default function AssessmentTable({ assessments, onDelete }: any) {
  const handleDelete = async (id: string) => {
    await deleteAssessment(id);
    onDelete(); // refresh list after delete
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Course</th>
          <th>Weight</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {assessments.map((a: any) => (
          <tr key={a.id} className="border-t">
            <td>{a.title}</td>
            <td>{a.course}</td>
            <td>{a.weight}</td>
            <td>{a.status}</td>

            <td>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
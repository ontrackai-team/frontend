type Props = {
  status: "pending" | "submitted" | "overdue";
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    submitted: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
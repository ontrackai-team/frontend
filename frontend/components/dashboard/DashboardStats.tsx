type Props = {
  total: number;
  pending: number;
  submitted: number;
  overdue: number;
};

export default function DashboardStats({
  total,
  pending,
  submitted,
  overdue,
}: Props) {
  const stats = [
    { label: "Total", value: total },
    { label: "Pending", value: pending },
    { label: "Submitted", value: submitted },
    { label: "Overdue", value: overdue },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-gray-500">
            {stat.label}
          </h3>

          <p className="text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
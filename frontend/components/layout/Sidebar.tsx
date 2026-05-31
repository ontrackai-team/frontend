import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-8">
        OnTrackAI
      </h2>

      <div className="flex flex-col gap-4">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/assessments">
          Assessments
        </Link>

        <Link href="/schedule">
          Schedule
        </Link>

        <Link href="/settings">
          Settings
        </Link>
      </div>
    </aside>
  );
}
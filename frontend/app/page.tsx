export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      <main className="max-w-5xl mx-auto p-6 mt-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to AI Assessment Tracking Assistant
          </h1>

          <p className="mt-3 text-gray-600">
            Track your assignments, deadlines, and academic workload efficiently with AI support.
          </p>
        </div>

        {/* System Description Cards */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              📚 Assignment Tracking
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Organize all your assignments in one place and avoid missing important academic tasks across courses.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              ⏰ Deadline Management
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Stay updated with upcoming deadlines and manage your time effectively to reduce last-minute stress.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              📊 Progress Tracker
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Visualize your academic progress and understand how much work is completed vs remaining.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              🤖 AI Suggestions
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Get intelligent recommendations to improve productivity and manage workload more efficiently.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
    
      <AppLayout>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-4 text-gray-600">
            Welcome to OnTrackAI.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="border rounded p-6">
              <h2 className="font-bold">
                Assessments
              </h2>
              <p>Coming in Week 4</p>
            </div>

            <div className="border rounded p-6">
              <h2 className="font-bold">
                Progress
              </h2>
              <p>Coming in Week 4</p>
            </div>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
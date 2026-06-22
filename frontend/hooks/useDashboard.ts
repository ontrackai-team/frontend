"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";

export function useDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    upcoming: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data =
        await getDashboardStats();

      setStats(data);

      setLoading(false);
    }

    fetchData();
  }, []);

  return {
    stats,
    loading,
  };
}
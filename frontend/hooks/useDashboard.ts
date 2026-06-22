"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";

export function useDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    stats,
    loading,
  };
}
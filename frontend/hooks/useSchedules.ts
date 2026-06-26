"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/services/schedulesService";

export function useSchedules() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // =========================
  // AUTO REFRESH (IMPORTANT FIX)
  // When user comes back from AI Planner page
  // =========================
  useEffect(() => {
    const handleFocus = () => {
      fetchData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchData]);

  // =========================
  // CREATE
  // =========================
  const addSchedule = async (data: any) => {
    await createSchedule(data);
    await fetchData();
  };

  // =========================
  // UPDATE
  // =========================
  const editSchedule = async (id: string, data: any) => {
    await updateSchedule(id, data);
    await fetchData();
  };

  // =========================
  // DELETE
  // =========================
  const removeSchedule = async (id: string) => {
    await deleteSchedule(id);
    await fetchData();
  };

  return {
    schedules,
    loading,
    addSchedule,
    editSchedule,
    removeSchedule,
    refetch: fetchData, // ⭐ IMPORTANT FOR AI PLANNER
  };
}
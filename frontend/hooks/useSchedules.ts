"use client";

import { useEffect, useState } from "react";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule
} from "@/lib/api/schedules";

export function useSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getSchedules();
    setSchedules(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSchedule = async (data: any) => {
    await createSchedule(data);
    fetchData();
  };

  const editSchedule = async (id: string, data: any) => {
    await updateSchedule(id, data);
    fetchData();
  };

  const removeSchedule = async (id: string) => {
    await deleteSchedule(id);
    fetchData();
  };

  return {
    schedules,
    loading,
    addSchedule,
    editSchedule,
    removeSchedule
  };
}
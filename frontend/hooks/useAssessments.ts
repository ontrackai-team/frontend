"use client";

import { useEffect, useState } from "react";
import { getAssessments } from "@/services/assessmentService";

export function useAssessments() {
  const [assessments, setAssessments] =
    useState<any[]>([]);
  const [loading, setLoading] =
    useState<boolean>(true);

  const fetchAssessments = async () => {
    setLoading(true);

    try {
      const res = await getAssessments();

      const data = Array.isArray(res.data)
        ? res.data
        : [];

      setAssessments(data);
    } catch (err) {
      console.error(err);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  return {
    assessments,
    loading,
    fetchAssessments,
  };
}
"use client";

import {
  getAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
} from "@/services/assessmentService";

import { useEffect, useState } from "react";

export function useAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssessments = async () => {
    const data = await getAssessments();

    setAssessments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const addAssessment = async (
    assessment: any
  ) => {
    await createAssessment(assessment);
    fetchAssessments();
  };

  const editAssessment = async (
    id: string,
    assessment: any
  ) => {
    await updateAssessment(id, assessment);
    fetchAssessments();
  };

  const removeAssessment = async (
    id: string
  ) => {
    await deleteAssessment(id);
    fetchAssessments();
  };

  return {
    assessments,
    loading,
    fetchAssessments,
    addAssessment,
    editAssessment,
    removeAssessment
  };
}
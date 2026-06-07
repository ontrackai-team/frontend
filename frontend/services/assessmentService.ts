const STORAGE_KEY = "assessments";

const getStoredAssessments = () => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

const saveAssessments = (data: any[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

export const getAssessments = async () => {
  const data = getStoredAssessments();

  return {
    data,
  };
};

export const createAssessment = async (
  assessment: any
) => {
  const assessments = getStoredAssessments();

  const newAssessment = {
    id: Date.now().toString(),
    ...assessment,
  };

  assessments.push(newAssessment);

  saveAssessments(assessments);

  return {
    data: newAssessment,
  };
};

export const deleteAssessment = async (
  id: string
) => {
  const assessments = getStoredAssessments();

  const filtered = assessments.filter(
    (a: any) => a.id !== id
  );

  saveAssessments(filtered);

  return {
    success: true,
  };
};

export const getAssessmentById = async (
  id: string
) => {
  const assessments = getStoredAssessments();

  return {
    data: assessments.find(
      (a: any) => a.id === id
    ),
  };
};
const STORAGE_KEY = "assessments";

const getStoredAssessments = () => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    const demoData = [
      {
        id: "1",
        title: "Database Project",
        course: "Database Systems",
        due_date: "2026-06-10T23:59",
        weight: 30,
        description: "Normalization project",
        status: "pending",
      },
      {
        id: "2",
        title: "AI Assignment",
        course: "Artificial Intelligence",
        due_date: "2026-06-14T23:59",
        weight: 20,
        description: "Machine learning report",
        status: "submitted",
      },
      {
        id: "3",
        title: "Software Engineering Quiz",
        course: "Software Engineering",
        due_date: "2026-06-08T23:59",
        weight: 10,
        description: "Sprint planning quiz",
        status: "pending",
      },
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(demoData)
    );

    return demoData;
  }

  return JSON.parse(data);
};

const saveAssessments = (data: any[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

export const getAssessments = async () => {
  return {
    data: getStoredAssessments(),
  };
};

export const getAssessmentById = async (id: string) => {
  const assessments = getStoredAssessments();

  return {
    data: assessments.find(
      (a: any) => a.id === id
    ),
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
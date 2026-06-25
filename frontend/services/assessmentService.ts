import API from "./api";



export type Assessment = {
  id?: string;
  title: string;
  course: string;
  due_date: string;
  weight: number;
  description: string;
  status: string;
};

export const getAssessments = async () => {
  const { data } = await API.get("/assessments/");
  return data;
};

export const createAssessment = async (
  assessment: Assessment
) => {
  const { data } = await API.post(
    "/assessments/",
    assessment
  );

  return data;
};

export const updateAssessment = async (
  id: string,
  assessment: Partial<Assessment>
) => {
  const { data } = await API.put(
    `/assessments/${id}`,
    assessment
  );

  return data;
};

export const deleteAssessment = async (
  id: string
) => {
  const { data } = await API.delete(
    `/assessments/${id}`
  );

  return data;
};
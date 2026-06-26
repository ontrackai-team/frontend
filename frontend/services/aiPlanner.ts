import API from "./api";

export const createStudyPlan = async () => {
  const res = await API.post("/ai/study-plan");
  return res.data;
};
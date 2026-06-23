import API from "./api";

export const generateStudyPlan = async () => {
  const res = await API.get("/ai/planner");
  return res.data;
};
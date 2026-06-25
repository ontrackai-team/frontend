import API from "./api";

export const createStudyPlan = async (
  subject: string,
  days_left: number,
  hours_per_day: number
) => {
  const res = await API.post("/ai/study-plan", {
    subject,
    days_left,
    hours_per_day,
  });

  return res.data;
};
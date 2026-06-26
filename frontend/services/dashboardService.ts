import API from "./api";

export const getDashboardStats = async () => {
  const { data } = await API.get("/dashboard/stats");
  return data;
};

// NEW: get schedules for dashboard
export const getTodaySchedules = async () => {
  const { data } = await API.get("/schedules/");
  return data;
};

// NEW: AI insight
export const getAIAdvice = async (message: string) => {
  const { data } = await API.post("/ai/chat", {
    message,
  });

  return data;
};
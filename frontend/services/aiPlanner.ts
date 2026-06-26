import API from "./api";

export const createStudyPlan = async () => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/ai/study-plan",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
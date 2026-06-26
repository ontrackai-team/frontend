import API from "./api";

export const createStudyPlan = async () => {
  const res = await API.post(
    "/ai/study-plan",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data;
};
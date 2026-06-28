import API from "./api";

export const getProfile = async () => {
  const { data } = await API.get("/profile");
  return data;
};

export const updateProfile = async (profile: any) => {
  const { data } = await API.put("/profile", profile);
  return data;
};
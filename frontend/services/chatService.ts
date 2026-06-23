import API from "./api";

export const sendMessage = async (message: string) => {
  const res = await API.post("/chat/", { message });
  return res.data;
};
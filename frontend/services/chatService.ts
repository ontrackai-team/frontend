import API from "./api";

export const sendMessage = async (
  message: string
) => {
  const { data } = await API.post(
    "/ai/chat",
    {
      message
    }
  );

  return data;
};
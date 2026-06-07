import API from "./api";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const loginUser = async (data: LoginData) => {
  const response = await API.post("/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterData) => {
  const response = await API.post("/register", data);
  return response.data;
};
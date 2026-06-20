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

// LOGIN
export const loginUser = async (data: LoginData) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// REGISTER
export const registerUser = async (data: RegisterData) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};
import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ontrackai.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getHealth = () => API.get("/health");

export const getRoot = () => API.get("/");

export const getAssessments = () =>
  API.get("/assessments");

export const getAssessmentById = (id: string) =>
  API.get(`/assessments/${id}`);

export const createAssessment = (data: any) =>
  API.post("/assessments", data);

export const deleteAssessment = (id: string) =>
  API.delete(`/assessments/${id}`);

export default API;
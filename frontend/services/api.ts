import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const getHealth = () => API.get("/health");

export const getRoot = () => API.get("/");

export const getAssessments = () => API.get("/assessments");

export const getAssessmentById = (id: string) =>
  API.get(`/assessments/${id}`);

export const createAssessment = (data: any) =>
  API.post("/assessments", data);

export const deleteAssessment = (id: string) =>
  API.delete(`/assessments/${id}`);
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
});

// Health check
export const getHealth = () => API.get("/health");

// Root
export const getRoot = () => API.get("/");

// Assessments
export const getAssessments = () => API.get("/assessments");

export const getAssessmentById = (id) => API.get(`/assessments/${id}`);

export const createAssessment = (data) => API.post("/assessments", data);

export const deleteAssessment = (id) => API.delete(`/assessments/${id}`);
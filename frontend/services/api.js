import axios from "axios";

const API = axios.create({
  baseURL: "https://ontrackai.onrender.com/",
});

export const getHealth = () => API.get("/health");
export const getRoot = () => API.get("/");
export const getAssessments = () => API.get("/assessments");

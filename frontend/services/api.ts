import axios from "axios";

// Axios instance (base configuration only)
const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ontrackai.onrender.com",
});

// Attach JWT token automatically to every request
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});
export default API;
// utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept request (cleaned — no logs)
axiosInstance.interceptors.request.use((config) => {
  return config;
});

// Intercept response (cleaned — only error logged)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Axios error:", error); // Optional: remove if you prefer 100% silence
    return Promise.reject(error);
  }
);

export default axiosInstance;

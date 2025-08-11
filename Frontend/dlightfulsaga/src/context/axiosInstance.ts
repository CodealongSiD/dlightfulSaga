// utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept request (cleaned — no logs)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //console.log("✅ Token attached to request:", token);
    } else {
      console.log("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Intercept response (cleaned — only error logged)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Axios error:", error); 
    return Promise.reject(error);
  }
);

export default axiosInstance;

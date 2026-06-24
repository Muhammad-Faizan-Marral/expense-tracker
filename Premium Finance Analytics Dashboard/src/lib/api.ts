import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, 
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (config.url?.includes('/ai/')) {
    config.timeout = 30000; 
  }
  console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;

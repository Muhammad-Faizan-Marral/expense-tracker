import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,        // Cookies ke liye zaroori
  timeout: 10000,
});

// Optional: Request interceptor (debug ke liye)
api.interceptors.request.use((config) => {
  console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
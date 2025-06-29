// src/api.js or wherever you keep this file
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ Direct URL instead of using REACT_APP_API_URL
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

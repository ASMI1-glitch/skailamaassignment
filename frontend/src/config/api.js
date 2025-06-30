// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://skailamaassignment-rgnw.onrender.com", // ✅ make sure this is correct
  withCredentials: true, // optional
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

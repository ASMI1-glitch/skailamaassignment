import axios from "axios";

const api = axios.create({
  baseURL: "https://skailamaassignment-rgnw.onrender.com",
  withCredentials: true // include credentials if your backend needs cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

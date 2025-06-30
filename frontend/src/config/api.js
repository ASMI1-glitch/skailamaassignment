import axios from "axios";

const api = axios.create({
  baseURL: "https://skailamaassignment-rgnw.onrender.com", // use your live backend URL
  withCredentials: true // include credentials if backend uses cookies/sessions
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

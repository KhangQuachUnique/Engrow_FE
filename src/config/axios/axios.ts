import { appConstants } from "@/share/constants/appConstants";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Add a request interceptor to include the access token in the Authorization header for all requests.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/**
 * Add a response interceptor to handle 401 Unauthorized errors globally. If a 401 error is encountered, the access token is removed from localStorage and the user is redirected to the login page.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = appConstants.LOGIN;
    }
    return Promise.reject(error);
  },
);

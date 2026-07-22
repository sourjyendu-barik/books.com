import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://books-com-backend.vercel.app",
  withCredentials: true,
});

// Attach Token from localStorage as a fallback for browsers blocking 3rd-party cookies
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authGoogle = async (code) => {
  const response = await api.post("/auth/callback", { code });
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Middleware protected route to fetch user data
export const getMyData = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  localStorage.removeItem("token");
  return response.data;
};

export const allProducts = async () => {
  const response = await api.get("/api/products");
  return response.data;
};

export const bookDetails = async (bookId) => {
  const response = await api.get(`/api/products/${bookId}`);
  return response.data;
};

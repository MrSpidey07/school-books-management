import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const boardAPI = {
  getAll: () => api.get("/boards"),
  getById: (id) => api.get(`/boards/${id}`),
  create: (data) => api.post("/boards", data),
  update: (id, data) => api.put(`/boards/${id}`, data),
  delete: (id) => api.delete(`/boards/${id}`),
};

export const mediumAPI = {
  getAll: () => api.get("/mediums"),
  getById: (id) => api.get(`/mediums/${id}`),
  create: (data) => api.post("/mediums", data),
  update: (id, data) => api.put(`/mediums/${id}`, data),
  delete: (id) => api.delete(`/mediums/${id}`),
};

export const classAPI = {
  getAll: () => api.get("/classes"),
  getById: (id) => api.get(`/classes/${id}`),
  create: (data) => api.post("/classes", data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
};

export const academicYearAPI = {
  getAll: () => api.get("/academic-years"),
  getById: (id) => api.get(`/academic-years/${id}`),
  create: (data) => api.post("/academic-years", data),
  update: (id, data) => api.put(`/academic-years/${id}`, data),
  delete: (id) => api.delete(`/academic-years/${id}`),
};

export const bookAPI = {
  getAll: () => api.get("/books"),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post("/books", data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
};

export const bookSetAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/book-sets?${params}`);
  },
  getById: (id) => api.get(`/book-sets/${id}`),
  create: (data) => api.post("/book-sets", data),
  update: (id, data) => api.put(`/book-sets/${id}`, data),
  delete: (id) => api.delete(`/book-sets/${id}`),
};

export default api;

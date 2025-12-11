import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useClassStore = create((set) => ({
  classes: [],
  loading: false,
  error: null,

  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/classes");
      set({ classes: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createClass: async (data) => {
    try {
      const response = await axiosInstance.post("/classes", data);
      set((state) => ({ classes: [...state.classes, response.data] }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateClass: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/classes/${id}`, data);
      set((state) => ({
        classes: state.classes.map((cls) =>
          cls._id === id ? response.data : cls
        ),
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteClass: async (id) => {
    try {
      await axiosInstance.delete(`/classes/${id}`);
      set((state) => ({
        classes: state.classes.filter((cls) => cls._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

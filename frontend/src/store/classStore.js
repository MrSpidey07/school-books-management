import { create } from "zustand";
import toast from "react-hot-toast";
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
      toast.success("Class created successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to create class");
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
      toast.success("Class updated successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update class");
      throw error;
    }
  },

  deleteClass: async (id) => {
    try {
      await axiosInstance.delete(`/classes/${id}`);
      set((state) => ({
        classes: state.classes.filter((cls) => cls._id !== id),
      }));
      toast.success("Class deleted successfully!");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete class");
      throw error;
    }
  },
}));

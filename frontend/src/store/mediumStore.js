import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useMediumStore = create((set) => ({
  mediums: [],
  loading: false,
  error: null,

  fetchMediums: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/mediums");
      set({ mediums: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createMedium: async (data) => {
    try {
      const response = await axiosInstance.post("/mediums", data);
      set((state) => ({ mediums: [...state.mediums, response.data] }));
      toast.success("Medium created successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to create medium");
      throw error;
    }
  },

  updateMedium: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/mediums/${id}`, data);
      set((state) => ({
        mediums: state.mediums.map((medium) =>
          medium._id === id ? response.data : medium
        ),
      }));
      toast.success("Medium updated successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update medium");
      throw error;
    }
  },

  deleteMedium: async (id) => {
    try {
      await axiosInstance.delete(`/mediums/${id}`);
      set((state) => ({
        mediums: state.mediums.filter((medium) => medium._id !== id),
      }));
      toast.success("Medium deleted successfully!");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete medium");
      throw error;
    }
  },
}));

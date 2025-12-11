import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useAcademicYearStore = create((set) => ({
  academicYears: [],
  loading: false,
  error: null,

  fetchAcademicYears: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/academic-years");
      set({ academicYears: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createAcademicYear: async (data) => {
    try {
      const response = await axiosInstance.post("/academic-years", data);
      set((state) => ({
        academicYears: [...state.academicYears, response.data],
      }));
      toast.success("Academic year created successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to create academic year");
      throw error;
    }
  },

  updateAcademicYear: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/academic-years/${id}`, data);
      set((state) => ({
        academicYears: state.academicYears.map((year) =>
          year._id === id ? response.data : year
        ),
      }));
      toast.success("Academic year updated successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update academic year");
      throw error;
    }
  },

  deleteAcademicYear: async (id) => {
    try {
      await axiosInstance.delete(`/academic-years/${id}`);
      set((state) => ({
        academicYears: state.academicYears.filter((year) => year._id !== id),
      }));
      toast.success("Academic year deleted successfully!");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete academic year");
      throw error;
    }
  },
}));

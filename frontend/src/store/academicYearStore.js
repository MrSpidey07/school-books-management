import { create } from "zustand";
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
      return response.data;
    } catch (error) {
      set({ error: error.message });
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
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteAcademicYear: async (id) => {
    try {
      await axiosInstance.delete(`/academic-years/${id}`);
      set((state) => ({
        academicYears: state.academicYears.filter((year) => year._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useBookSetStore = create((set) => ({
  bookSets: [],
  loading: false,
  error: null,

  fetchBookSets: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams(filters);
      const response = await axiosInstance.get(`/book-sets?${params}`);
      set({ bookSets: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getBookSetById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/book-sets/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createBookSet: async (data) => {
    try {
      const response = await axiosInstance.post("/book-sets", data);
      set((state) => ({ bookSets: [...state.bookSets, response.data] }));
      toast.success("Book set created successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to create book set");
      throw error;
    }
  },

  updateBookSet: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/book-sets/${id}`, data);
      set((state) => ({
        bookSets: state.bookSets.map((bookSet) =>
          bookSet._id === id ? response.data : bookSet
        ),
      }));
      toast.success("Book set updated successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update book set");
      throw error;
    }
  },

  deleteBookSet: async (id) => {
    try {
      await axiosInstance.delete(`/book-sets/${id}`);
      set((state) => ({
        bookSets: state.bookSets.filter((bookSet) => bookSet._id !== id),
      }));
      toast.success("Book set deleted successfully!");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete book set");
      throw error;
    }
  },
}));

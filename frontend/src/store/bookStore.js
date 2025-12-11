import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useBookStore = create((set) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/books");
      set({ books: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createBook: async (data) => {
    try {
      const response = await axiosInstance.post("/books", data);
      set((state) => ({ books: [...state.books, response.data] }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateBook: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/books/${id}`, data);
      set((state) => ({
        books: state.books.map((book) =>
          book._id === id ? response.data : book
        ),
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      set((state) => ({
        books: state.books.filter((book) => book._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

import { create } from "zustand";
import toast from "react-hot-toast";
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
      toast.success("Book created successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to create book");
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
      toast.success("Book updated successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update book");
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      set((state) => ({
        books: state.books.filter((book) => book._id !== id),
      }));
      toast.success("Book deleted successfully!");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete book");
      throw error;
    }
  },
}));

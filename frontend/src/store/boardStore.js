import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useBoardStore = create((set) => ({
  boards: [],
  loading: false,
  error: null,

  fetchBoards: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/boards");
      set({ boards: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createBoard: async (data) => {
    try {
      const response = await axiosInstance.post("/boards", data);
      set((state) => ({ boards: [...state.boards, response.data] }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateBoard: async (id, data) => {
    try {
      const response = await axiosInstance.put(`/boards/${id}`, data);
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === id ? response.data : board
        ),
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteBoard: async (id) => {
    try {
      await axiosInstance.delete(`/boards/${id}`);
      set((state) => ({
        boards: state.boards.filter((board) => board._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

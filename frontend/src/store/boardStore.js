import { create } from "zustand";
import toast from "react-hot-toast";
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
      toast.success("Board created successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to create board");
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
      toast.success("Board updated successfully!");
      return response.data;
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to update board");
      throw error;
    }
  },

  deleteBoard: async (id) => {
    try {
      await axiosInstance.delete(`/boards/${id}`);
      set((state) => ({
        boards: state.boards.filter((board) => board._id !== id),
      }));
      toast.success("Board deleted successfully!");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete board");
      throw error;
    }
  },
}));

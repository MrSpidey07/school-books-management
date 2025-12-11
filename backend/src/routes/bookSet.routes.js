import express from "express";
import {
  createBookSet,
  getAllBookSets,
  getBookSetById,
  updateBookSet,
  deleteBookSet,
} from "../controllers/bookSet.controller.js";

const router = express.Router();

router.post("/", createBookSet);
router.get("/", getAllBookSets);
router.get("/:id", getBookSetById);
router.put("/:id", updateBookSet);
router.delete("/:id", deleteBookSet);

export default router;

import express from "express";
import {
  createMedium,
  getAllMediums,
  getMediumById,
  updateMedium,
  deleteMedium,
} from "../controllers/medium.controller.js";

const router = express.Router();

router.post("/", createMedium);
router.get("/", getAllMediums);
router.get("/:id", getMediumById);
router.put("/:id", updateMedium);
router.delete("/:id", deleteMedium);

export default router;

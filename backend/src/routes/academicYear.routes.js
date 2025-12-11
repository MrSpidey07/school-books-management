import express from "express";
import {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
} from "../controllers/academicYear.controller.js";

const router = express.Router();

router.post("/", createAcademicYear);
router.get("/", getAllAcademicYears);
router.get("/:id", getAcademicYearById);
router.put("/:id", updateAcademicYear);
router.delete("/:id", deleteAcademicYear);

export default router;

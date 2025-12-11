import AcademicYear from "../models/AcademicYear.model.js";

export const createAcademicYear = async (req, res) => {
  try {
    const academicYear = await AcademicYear.create(req.body);
    res.status(201).json(academicYear);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAcademicYears = async (req, res) => {
  try {
    const academicYears = await AcademicYear.find();
    res.json(academicYears);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAcademicYearById = async (req, res) => {
  try {
    const academicYear = await AcademicYear.findById(req.params.id);
    if (!academicYear) {
      return res.status(404).json({ message: "Academic Year not found" });
    }
    res.json(academicYear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAcademicYear = async (req, res) => {
  try {
    const academicYear = await AcademicYear.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!academicYear) {
      return res.status(404).json({ message: "Academic Year not found" });
    }
    res.json(academicYear);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAcademicYear = async (req, res) => {
  try {
    const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);
    if (!academicYear) {
      return res.status(404).json({ message: "Academic Year not found" });
    }
    res.json({ message: "Academic Year deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

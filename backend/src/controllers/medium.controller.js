import Medium from "../models/Medium.model.js";

export const createMedium = async (req, res) => {
  try {
    const medium = await Medium.create(req.body);
    res.status(201).json(medium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMediums = async (req, res) => {
  try {
    const mediums = await Medium.find();
    res.json(mediums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMediumById = async (req, res) => {
  try {
    const medium = await Medium.findById(req.params.id);
    if (!medium) {
      return res.status(404).json({ message: "Medium not found" });
    }
    res.json(medium);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedium = async (req, res) => {
  try {
    const medium = await Medium.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!medium) {
      return res.status(404).json({ message: "Medium not found" });
    }
    res.json(medium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedium = async (req, res) => {
  try {
    const medium = await Medium.findByIdAndDelete(req.params.id);
    if (!medium) {
      return res.status(404).json({ message: "Medium not found" });
    }
    res.json({ message: "Medium deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Class from "../models/Class.model.js";

export const createClass = async (req, res) => {
  try {
    const classData = await Class.create(req.body);
    res.status(201).json(classData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(classData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

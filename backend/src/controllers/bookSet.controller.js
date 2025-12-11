import BookSet from "../models/BookSet.model.js";

export const createBookSet = async (req, res) => {
  try {
    const bookSet = await BookSet.create(req.body);
    const populatedBookSet = await BookSet.findById(bookSet._id)
      .populate("board_id")
      .populate("medium_id")
      .populate("class_id")
      .populate("year_id")
      .populate("books.book_id");
    res.status(201).json(populatedBookSet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBookSets = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id } = req.query;
    const filter = {};

    if (board_id) filter.board_id = board_id;
    if (medium_id) filter.medium_id = medium_id;
    if (class_id) filter.class_id = class_id;
    if (year_id) filter.year_id = year_id;

    const bookSets = await BookSet.find(filter)
      .populate("board_id")
      .populate("medium_id")
      .populate("class_id")
      .populate("year_id")
      .populate("books.book_id");
    res.json(bookSets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookSetById = async (req, res) => {
  try {
    const bookSet = await BookSet.findById(req.params.id)
      .populate("board_id")
      .populate("medium_id")
      .populate("class_id")
      .populate("year_id")
      .populate("books.book_id");
    if (!bookSet) {
      return res.status(404).json({ message: "Book Set not found" });
    }
    res.json(bookSet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookSet = async (req, res) => {
  try {
    const bookSet = await BookSet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("board_id")
      .populate("medium_id")
      .populate("class_id")
      .populate("year_id")
      .populate("books.book_id");
    if (!bookSet) {
      return res.status(404).json({ message: "Book Set not found" });
    }
    res.json(bookSet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBookSet = async (req, res) => {
  try {
    const bookSet = await BookSet.findByIdAndDelete(req.params.id);
    if (!bookSet) {
      return res.status(404).json({ message: "Book Set not found" });
    }
    res.json({ message: "Book Set deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

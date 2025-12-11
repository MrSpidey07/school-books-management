import mongoose from "mongoose";

const bookSetItemSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const bookSetSchema = new mongoose.Schema(
  {
    board_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    medium_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medium",
      required: true,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    year_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    set_name: {
      type: String,
      required: true,
    },
    books: [bookSetItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookSet", bookSetSchema);

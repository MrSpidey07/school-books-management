import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    book_name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import boardRoutes from "./routes/board.routes.js";
import mediumRoutes from "./routes/medium.routes.js";
import classRoutes from "./routes/class.routes.js";
import academicYearRoutes from "./routes/academicYear.routes.js";
import bookRoutes from "./routes/book.routes.js";
import bookSetRoutes from "./routes/bookSet.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/boards", boardRoutes);
app.use("/api/mediums", mediumRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/academic-years", academicYearRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/book-sets", bookSetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

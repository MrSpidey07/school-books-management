import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, BookPlus } from "lucide-react";
import {
  useBoardStore,
  useMediumStore,
  useClassStore,
  useAcademicYearStore,
  useBookStore,
  useBookSetStore,
} from "../store";

function BookSetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    board_id: "",
    medium_id: "",
    class_id: "",
    year_id: "",
    set_name: "",
    books: [],
  });

  const boards = useBoardStore((state) => state.boards);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);

  const mediums = useMediumStore((state) => state.mediums);
  const fetchMediums = useMediumStore((state) => state.fetchMediums);

  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  const academicYears = useAcademicYearStore((state) => state.academicYears);
  const fetchAcademicYears = useAcademicYearStore(
    (state) => state.fetchAcademicYears
  );

  const allBooks = useBookStore((state) => state.books);
  const fetchBooks = useBookStore((state) => state.fetchBooks);

  const getBookSetById = useBookSetStore((state) => state.getBookSetById);
  const createBookSet = useBookSetStore((state) => state.createBookSet);
  const updateBookSet = useBookSetStore((state) => state.updateBookSet);

  useEffect(() => {
    fetchBoards();
    fetchMediums();
    fetchClasses();
    fetchAcademicYears();
    fetchBooks();
  }, [fetchBoards, fetchMediums, fetchClasses, fetchAcademicYears, fetchBooks]);

  useEffect(() => {
    if (id) {
      loadBookSet();
    }
  }, [id]);

  const loadBookSet = async () => {
    try {
      const bookSet = await getBookSetById(id);
      setFormData({
        board_id: bookSet.board_id._id,
        medium_id: bookSet.medium_id._id,
        class_id: bookSet.class_id._id,
        year_id: bookSet.year_id._id,
        set_name: bookSet.set_name,
        books: bookSet.books.map((b) => ({
          book_id: b.book_id._id,
          quantity: b.quantity,
        })),
      });
    } catch (error) {
      console.error("Error loading book set:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookToggle = (bookId) => {
    const existingBook = formData.books.find((b) => b.book_id === bookId);
    if (existingBook) {
      setFormData({
        ...formData,
        books: formData.books.filter((b) => b.book_id !== bookId),
      });
    } else {
      setFormData({
        ...formData,
        books: [...formData.books, { book_id: bookId, quantity: 1 }],
      });
    }
  };

  const handleQuantityChange = (bookId, quantity) => {
    setFormData({
      ...formData,
      books: formData.books.map((b) =>
        b.book_id === bookId ? { ...b, quantity: parseInt(quantity) || 1 } : b
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateBookSet(id, formData);
      } else {
        await createBookSet(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving book set:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/")}
              className="btn btn-circle bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="card-title text-xl sm:text-3xl">
                <BookPlus className="mr-2" />
                {id ? "Edit Book Set" : "Create Book Set"}
              </h1>
              <p className="text-base-content/60 mt-2 text-sm sm:text-base">
                {id
                  ? "Update the book set details"
                  : "Create a new book set with selected books"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-lg sm:text-xl mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Board *</span>
                </label>
                <select
                  name="board_id"
                  value={formData.board_id}
                  onChange={handleChange}
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Board</option>
                  {boards.map((board) => (
                    <option key={board._id} value={board._id}>
                      {board.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Medium *</span>
                </label>
                <select
                  name="medium_id"
                  value={formData.medium_id}
                  onChange={handleChange}
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Medium</option>
                  {mediums.map((medium) => (
                    <option key={medium._id} value={medium._id}>
                      {medium.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Class *</span>
                </label>
                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleChange}
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Academic Year *</span>
                </label>
                <select
                  name="year_id"
                  value={formData.year_id}
                  onChange={handleChange}
                  required
                  className="select select-bordered"
                >
                  <option value="">Select Year</option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year._id}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full md:col-span-2">
                <label className="label">
                  <span className="label-text">Set Name *</span>
                </label>
                <input
                  type="text"
                  name="set_name"
                  value={formData.set_name}
                  onChange={handleChange}
                  required
                  className="input input-bordered"
                  placeholder="e.g., Class 3 English Medium Set"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Books Selection */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">
              Select Books
              <div className="badge badge-primary">
                {formData.books.length} selected
              </div>
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {allBooks.map((book) => {
                const selectedBook = formData.books.find(
                  (b) => b.book_id === book._id
                );
                const isSelected = !!selectedBook;

                return (
                  <div
                    key={book._id}
                    className={`card ${
                      isSelected
                        ? "bg-primary/10 border-primary"
                        : "bg-base-200"
                    } border-2`}
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleBookToggle(book._id)}
                          className="checkbox checkbox-primary"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold">{book.book_name}</h3>
                          <p className="text-sm text-base-content/60">
                            {book.subject} • {book.publisher}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="form-control w-24">
                            <label className="label py-0">
                              <span className="label-text-alt">Quantity</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={selectedBook.quantity}
                              onChange={(e) =>
                                handleQuantityChange(book._id, e.target.value)
                              }
                              className="input input-bordered input-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md order-1 sm:order-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <Save size={20} />
                    <span className="hidden sm:inline">
                      {id ? "Update" : "Create"} Book Set
                    </span>
                    <span className="sm:hidden">
                      {id ? "Update" : "Create"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookSetForm;

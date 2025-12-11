import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {id ? "Edit Book Set" : "Create Book Set"}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Board
                </label>
                <select
                  name="board_id"
                  value={formData.board_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Board</option>
                  {boards.map((board) => (
                    <option key={board._id} value={board._id}>
                      {board.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Medium
                </label>
                <select
                  name="medium_id"
                  value={formData.medium_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Medium</option>
                  {mediums.map((medium) => (
                    <option key={medium._id} value={medium._id}>
                      {medium.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class
                </label>
                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Academic Year
                </label>
                <select
                  name="year_id"
                  value={formData.year_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Year</option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year._id}>
                      {year.year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Set Name
                </label>
                <input
                  type="text"
                  name="set_name"
                  value={formData.set_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Books
              </label>
              <div className="space-y-2">
                {allBooks.map((book) => {
                  const selectedBook = formData.books.find(
                    (b) => b.book_id === book._id
                  );
                  const isSelected = !!selectedBook;

                  return (
                    <div
                      key={book._id}
                      className="flex items-center space-x-4 p-3 border rounded-md"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleBookToggle(book._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {book.book_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {book.subject} - {book.publisher}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex items-center space-x-2">
                          <label className="text-sm text-gray-700">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={selectedBook.quantity}
                            onChange={(e) =>
                              handleQuantityChange(book._id, e.target.value)
                            }
                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookSetForm;

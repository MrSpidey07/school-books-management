import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  bookSetAPI,
  boardAPI,
  mediumAPI,
  classAPI,
  academicYearAPI,
} from "../services/api";

function BookSetList() {
  const [bookSets, setBookSets] = useState([]);
  const [boards, setBoards] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMasterData();
  }, []);

  useEffect(() => {
    loadBookSets();
  }, [filters]);

  const loadMasterData = async () => {
    try {
      const [boardsRes, mediumsRes, classesRes, yearsRes] = await Promise.all([
        boardAPI.getAll(),
        mediumAPI.getAll(),
        classAPI.getAll(),
        academicYearAPI.getAll(),
      ]);
      setBoards(boardsRes.data);
      setMediums(mediumsRes.data);
      setClasses(classesRes.data);
      setAcademicYears(yearsRes.data);
    } catch (error) {
      console.error("Error loading master data:", error);
    }
  };

  const loadBookSets = async () => {
    try {
      setLoading(true);
      const response = await bookSetAPI.getAll(filters);
      setBookSets(response.data);
    } catch (error) {
      console.error("Error loading book sets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      if (value === "") {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book set?")) {
      try {
        await bookSetAPI.delete(id);
        loadBookSets();
      } catch (error) {
        console.error("Error deleting book set:", error);
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Book Sets</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all book sets with their board, medium, class, and
            academic year.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/book-sets/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Create Book Set
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <select
          value={filters.board_id || ""}
          onChange={(e) => handleFilterChange("board_id", e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Boards</option>
          {boards.map((board) => (
            <option key={board._id} value={board._id}>
              {board.name}
            </option>
          ))}
        </select>

        <select
          value={filters.medium_id || ""}
          onChange={(e) => handleFilterChange("medium_id", e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Mediums</option>
          {mediums.map((medium) => (
            <option key={medium._id} value={medium._id}>
              {medium.name}
            </option>
          ))}
        </select>

        <select
          value={filters.class_id || ""}
          onChange={(e) => handleFilterChange("class_id", e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>

        <select
          value={filters.year_id || ""}
          onChange={(e) => handleFilterChange("year_id", e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Years</option>
          {academicYears.map((year) => (
            <option key={year._id} value={year._id}>
              {year.year}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="mt-8 text-center">Loading...</div>
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Set Name
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Board
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Medium
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Class
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Year
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Books
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {bookSets.map((bookSet) => (
                      <tr key={bookSet._id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {bookSet.set_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {bookSet.board_id?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {bookSet.medium_id?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {bookSet.class_id?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {bookSet.year_id?.year}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {bookSet.books?.length || 0}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/book-sets/edit/${bookSet._id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(bookSet._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSetList;

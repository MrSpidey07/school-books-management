import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Filter, Edit, Trash2, Book } from "lucide-react";
import {
  useBoardStore,
  useMediumStore,
  useClassStore,
  useAcademicYearStore,
  useBookSetStore,
} from "../store";

function BookSetList() {
  const [filters, setFilters] = useState({});

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

  const bookSets = useBookSetStore((state) => state.bookSets);
  const loading = useBookSetStore((state) => state.loading);
  const fetchBookSets = useBookSetStore((state) => state.fetchBookSets);
  const deleteBookSet = useBookSetStore((state) => state.deleteBookSet);

  useEffect(() => {
    fetchBoards();
    fetchMediums();
    fetchClasses();
    fetchAcademicYears();
  }, [fetchBoards, fetchMediums, fetchClasses, fetchAcademicYears]);

  useEffect(() => {
    fetchBookSets(filters);
  }, [filters, fetchBookSets]);

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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteBookSet(id);
      } catch (error) {
        console.error("Error deleting book set:", error);
      }
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="card-title text-2xl sm:text-3xl">
                <Book className="mr-2" />
                Book Sets
              </h1>
              <p className="text-base-content/60 mt-2 text-sm sm:text-base">
                Manage and organize book sets for different boards, mediums, and
                classes
              </p>
            </div>
            <Link
              to="/book-sets/create"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Create Book Set</span>
              <span className="sm:hidden">Create</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title text-lg">
              <Filter size={20} />
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Board</span>
              </label>
              <select
                value={filters.board_id || ""}
                onChange={(e) => handleFilterChange("board_id", e.target.value)}
                className="select select-bordered"
              >
                <option value="">All Boards</option>
                {boards.map((board) => (
                  <option key={board._id} value={board._id}>
                    {board.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Medium</span>
              </label>
              <select
                value={filters.medium_id || ""}
                onChange={(e) =>
                  handleFilterChange("medium_id", e.target.value)
                }
                className="select select-bordered"
              >
                <option value="">All Mediums</option>
                {mediums.map((medium) => (
                  <option key={medium._id} value={medium._id}>
                    {medium.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Class</span>
              </label>
              <select
                value={filters.class_id || ""}
                onChange={(e) => handleFilterChange("class_id", e.target.value)}
                className="select select-bordered"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Academic Year</span>
              </label>
              <select
                value={filters.year_id || ""}
                onChange={(e) => handleFilterChange("year_id", e.target.value)}
                className="select select-bordered"
              >
                <option value="">All Years</option>
                {academicYears.map((year) => (
                  <option key={year._id} value={year._id}>
                    {year.year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Book Sets Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : bookSets.length === 0 ? (
            <div className="text-center py-12">
              <Book size={48} className="mx-auto mb-4 text-base-content/30" />
              <p className="text-lg text-base-content/60">No book sets found</p>
              <p className="text-sm text-base-content/40 mt-2">
                Create a new book set to get started
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Set Name</th>
                    <th>Board</th>
                    <th>Medium</th>
                    <th>Class</th>
                    <th>Year</th>
                    <th>Books</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookSets.map((bookSet) => (
                    <tr key={bookSet._id}>
                      <td>
                        <div className="font-bold">{bookSet.set_name}</div>
                      </td>
                      <td>
                        <div className="badge badge-outline">
                          {bookSet.board_id?.name}
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-outline">
                          {bookSet.medium_id?.name}
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-outline">
                          {bookSet.class_id?.name}
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-outline">
                          {bookSet.year_id?.year}
                        </div>
                      </td>
                      <td>
                        <div className="badge bg-blue-100 text-blue-700 border-blue-200">
                          {bookSet.books?.length || 0} books
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            to={`/book-sets/edit/${bookSet._id}`}
                            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-0"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(bookSet._id, bookSet.set_name)
                            }
                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookSetList;

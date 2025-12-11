import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Database } from "lucide-react";
import {
  useBoardStore,
  useMediumStore,
  useClassStore,
  useAcademicYearStore,
  useBookStore,
} from "../store";

function MasterData() {
  const [activeTab, setActiveTab] = useState("boards");
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const boards = useBoardStore((state) => state.boards);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);
  const createBoard = useBoardStore((state) => state.createBoard);
  const updateBoard = useBoardStore((state) => state.updateBoard);
  const deleteBoard = useBoardStore((state) => state.deleteBoard);

  const mediums = useMediumStore((state) => state.mediums);
  const fetchMediums = useMediumStore((state) => state.fetchMediums);
  const createMedium = useMediumStore((state) => state.createMedium);
  const updateMedium = useMediumStore((state) => state.updateMedium);
  const deleteMedium = useMediumStore((state) => state.deleteMedium);

  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  const createClass = useClassStore((state) => state.createClass);
  const updateClass = useClassStore((state) => state.updateClass);
  const deleteClass = useClassStore((state) => state.deleteClass);

  const academicYears = useAcademicYearStore((state) => state.academicYears);
  const fetchAcademicYears = useAcademicYearStore(
    (state) => state.fetchAcademicYears
  );
  const createAcademicYear = useAcademicYearStore(
    (state) => state.createAcademicYear
  );
  const updateAcademicYear = useAcademicYearStore(
    (state) => state.updateAcademicYear
  );
  const deleteAcademicYear = useAcademicYearStore(
    (state) => state.deleteAcademicYear
  );

  const books = useBookStore((state) => state.books);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const createBook = useBookStore((state) => state.createBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const deleteBook = useBookStore((state) => state.deleteBook);

  useEffect(() => {
    loadData();
    setFormData({});
    setEditId(null);
  }, [activeTab]);

  const loadData = () => {
    switch (activeTab) {
      case "boards":
        fetchBoards();
        break;
      case "mediums":
        fetchMediums();
        break;
      case "classes":
        fetchClasses();
        break;
      case "years":
        fetchAcademicYears();
        break;
      case "books":
        fetchBooks();
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (activeTab) {
        case "boards":
          if (editId) {
            await updateBoard(editId, formData);
          } else {
            await createBoard(formData);
          }
          break;
        case "mediums":
          if (editId) {
            await updateMedium(editId, formData);
          } else {
            await createMedium(formData);
          }
          break;
        case "classes":
          if (editId) {
            await updateClass(editId, formData);
          } else {
            await createClass(formData);
          }
          break;
        case "years":
          if (editId) {
            await updateAcademicYear(editId, formData);
          } else {
            await createAcademicYear(formData);
          }
          break;
        case "books":
          if (editId) {
            await updateBook(editId, formData);
          } else {
            await createBook(formData);
          }
          break;
      }
      setFormData({});
      setEditId(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        switch (activeTab) {
          case "boards":
            await deleteBoard(id);
            break;
          case "mediums":
            await deleteMedium(id);
            break;
          case "classes":
            await deleteClass(id);
            break;
          case "years":
            await deleteAcademicYear(id);
            break;
          case "books":
            await deleteBook(id);
            break;
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const renderForm = () => {
    if (activeTab === "books") {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Book Name *</span>
            </label>
            <input
              type="text"
              value={formData.book_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, book_name: e.target.value })
              }
              required
              className="input input-bordered"
              placeholder="Enter book name"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Subject *</span>
            </label>
            <input
              type="text"
              value={formData.subject || ""}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
              className="input input-bordered"
              placeholder="Enter subject"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Publisher *</span>
            </label>
            <input
              type="text"
              value={formData.publisher || ""}
              onChange={(e) =>
                setFormData({ ...formData, publisher: e.target.value })
              }
              required
              className="input input-bordered"
              placeholder="Enter publisher"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md"
            >
              <Plus size={18} />
              {editId ? "Update" : "Add"} Book
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({});
                }}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      );
    } else {
      const fieldName = activeTab === "years" ? "year" : "name";
      const label = activeTab === "years" ? "Year" : "Name";
      const placeholder =
        activeTab === "years" ? "e.g., 2024-2025" : "Enter name";

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">{label} *</span>
            </label>
            <input
              type="text"
              value={formData[fieldName] || ""}
              onChange={(e) => setFormData({ [fieldName]: e.target.value })}
              required
              className="input input-bordered"
              placeholder={placeholder}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md"
            >
              <Plus size={18} />
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({});
                }}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      );
    }
  };

  const renderList = () => {
    let data = [];
    switch (activeTab) {
      case "boards":
        data = boards;
        break;
      case "mediums":
        data = mediums;
        break;
      case "classes":
        data = classes;
        break;
      case "years":
        data = academicYears;
        break;
      case "books":
        data = books;
        break;
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <Database size={48} className="mx-auto mb-4 text-base-content/30" />
          <p className="text-lg text-base-content/60">No data found</p>
          <p className="text-sm text-base-content/40 mt-2">
            Add your first entry using the form above
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              {activeTab === "books" ? (
                <>
                  <th>Book Name</th>
                  <th>Subject</th>
                  <th>Publisher</th>
                </>
              ) : (
                <th>{activeTab === "years" ? "Year" : "Name"}</th>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                {activeTab === "books" ? (
                  <>
                    <td>
                      <div className="font-bold">{item.book_name}</div>
                    </td>
                    <td>
                      <div className="badge badge-outline">{item.subject}</div>
                    </td>
                    <td>{item.publisher}</td>
                  </>
                ) : (
                  <td>
                    <div className="font-bold">
                      {activeTab === "years" ? item.year : item.name}
                    </div>
                  </td>
                )}
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-0"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          item._id,
                          activeTab === "books"
                            ? item.book_name
                            : activeTab === "years"
                            ? item.year
                            : item.name
                        )
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
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl sm:text-3xl">
            <Database className="mr-2" />
            Master Data
          </h1>
          <p className="text-base-content/60 mt-2 text-sm sm:text-base">
            Manage boards, mediums, classes, academic years, and books
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-100 shadow-xl p-2 overflow-x-auto flex-nowrap">
        <button
          onClick={() => setActiveTab("boards")}
          className={`tab flex-shrink-0 ${
            activeTab === "boards" ? "tab-active !text-white" : ""
          }`}
        >
          Boards
        </button>
        <button
          onClick={() => setActiveTab("mediums")}
          className={`tab flex-shrink-0 ${
            activeTab === "mediums" ? "tab-active !text-white" : ""
          }`}
        >
          Mediums
        </button>
        <button
          onClick={() => setActiveTab("classes")}
          className={`tab flex-shrink-0 ${
            activeTab === "classes" ? "tab-active !text-white" : ""
          }`}
        >
          Classes
        </button>
        <button
          onClick={() => setActiveTab("years")}
          className={`tab flex-shrink-0 ${
            activeTab === "years" ? "tab-active !text-white" : ""
          }`}
        >
          <span className="hidden sm:inline">Academic Years</span>
          <span className="sm:hidden">Years</span>
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={`tab flex-shrink-0 ${
            activeTab === "books" ? "tab-active !text-white" : ""
          }`}
        >
          Books
        </button>
      </div>

      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            {editId ? "Edit" : "Add New"}{" "}
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
          </h2>
          {renderForm()}
        </div>
      </div>

      {/* List */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">{renderList()}</div>
      </div>
    </div>
  );
}

export default MasterData;

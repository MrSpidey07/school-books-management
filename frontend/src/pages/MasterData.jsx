import { useState, useEffect } from "react";
import {
  boardAPI,
  mediumAPI,
  classAPI,
  academicYearAPI,
  bookAPI,
} from "../services/api";

function MasterData() {
  const [activeTab, setActiveTab] = useState("boards");
  const [boards, setBoards] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      switch (activeTab) {
        case "boards":
          const boardsRes = await boardAPI.getAll();
          setBoards(boardsRes.data);
          break;
        case "mediums":
          const mediumsRes = await mediumAPI.getAll();
          setMediums(mediumsRes.data);
          break;
        case "classes":
          const classesRes = await classAPI.getAll();
          setClasses(classesRes.data);
          break;
        case "years":
          const yearsRes = await academicYearAPI.getAll();
          setAcademicYears(yearsRes.data);
          break;
        case "books":
          const booksRes = await bookAPI.getAll();
          setBooks(booksRes.data);
          break;
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (activeTab) {
        case "boards":
          if (editId) {
            await boardAPI.update(editId, formData);
          } else {
            await boardAPI.create(formData);
          }
          break;
        case "mediums":
          if (editId) {
            await mediumAPI.update(editId, formData);
          } else {
            await mediumAPI.create(formData);
          }
          break;
        case "classes":
          if (editId) {
            await classAPI.update(editId, formData);
          } else {
            await classAPI.create(formData);
          }
          break;
        case "years":
          if (editId) {
            await academicYearAPI.update(editId, formData);
          } else {
            await academicYearAPI.create(formData);
          }
          break;
        case "books":
          if (editId) {
            await bookAPI.update(editId, formData);
          } else {
            await bookAPI.create(formData);
          }
          break;
      }
      setFormData({});
      setEditId(null);
      loadData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        switch (activeTab) {
          case "boards":
            await boardAPI.delete(id);
            break;
          case "mediums":
            await mediumAPI.delete(id);
            break;
          case "classes":
            await classAPI.delete(id);
            break;
          case "years":
            await academicYearAPI.delete(id);
            break;
          case "books":
            await bookAPI.delete(id);
            break;
        }
        loadData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const renderForm = () => {
    if (activeTab === "books") {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Book Name
            </label>
            <input
              type="text"
              value={formData.book_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, book_name: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject || ""}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Publisher
            </label>
            <input
              type="text"
              value={formData.publisher || ""}
              onChange={(e) =>
                setFormData({ ...formData, publisher: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            {editId ? "Update" : "Add"} Book
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({});
              }}
              className="ml-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </form>
      );
    } else {
      const fieldName = activeTab === "years" ? "year" : "name";
      const label = activeTab === "years" ? "Year" : "Name";

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="text"
              value={formData[fieldName] || ""}
              onChange={(e) => setFormData({ [fieldName]: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({});
              }}
              className="ml-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
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

    return (
      <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {activeTab === "books" ? (
                <>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Book Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Subject
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Publisher
                  </th>
                </>
              ) : (
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  {activeTab === "years" ? "Year" : "Name"}
                </th>
              )}
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item) => (
              <tr key={item._id}>
                {activeTab === "books" ? (
                  <>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {item.book_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.subject}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.publisher}
                    </td>
                  </>
                ) : (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {activeTab === "years" ? item.year : item.name}
                  </td>
                )}
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Master Data</h1>

      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("boards")}
              className={`${
                activeTab === "boards"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Boards
            </button>
            <button
              onClick={() => setActiveTab("mediums")}
              className={`${
                activeTab === "mediums"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Mediums
            </button>
            <button
              onClick={() => setActiveTab("classes")}
              className={`${
                activeTab === "classes"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Classes
            </button>
            <button
              onClick={() => setActiveTab("years")}
              className={`${
                activeTab === "years"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Academic Years
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`${
                activeTab === "books"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Books
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
        {renderForm()}
      </div>

      {renderList()}
    </div>
  );
}

export default MasterData;

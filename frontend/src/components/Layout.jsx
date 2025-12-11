import { Link, useLocation } from "react-router-dom";
import { BookOpen, Database } from "lucide-react";

function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return (
        location.pathname === "/" || location.pathname.startsWith("/book-sets")
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl flex items-center"
          >
            <BookOpen className="mr-2" size={24} />
            <span className="hidden sm:inline">School Book Management</span>
            <span className="sm:hidden">SBM</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-2 gap-1">
            <li>
              <Link
                to="/"
                className={isActive("/") ? "active !text-white" : ""}
              >
                <BookOpen size={18} />
                <span className="hidden md:inline">Book Sets</span>
              </Link>
            </li>
            <li>
              <Link
                to="/master-data"
                className={isActive("/master-data") ? "active !text-white" : ""}
              >
                <Database size={18} />
                <span className="hidden md:inline">Master Data</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <main className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;

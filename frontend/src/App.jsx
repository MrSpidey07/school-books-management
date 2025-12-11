import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import BookSetList from "./pages/BookSetList";
import BookSetForm from "./pages/BookSetForm";
import MasterData from "./pages/MasterData";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#374151",
            border: "1px solid #e5e7eb",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<BookSetList />} />
          <Route path="/book-sets/create" element={<BookSetForm />} />
          <Route path="/book-sets/edit/:id" element={<BookSetForm />} />
          <Route path="/master-data" element={<MasterData />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

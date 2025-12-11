import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BookSetList from "./pages/BookSetList";
import BookSetForm from "./pages/BookSetForm";
import MasterData from "./pages/MasterData";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BookSetList />} />
        <Route path="/book-sets/create" element={<BookSetForm />} />
        <Route path="/book-sets/edit/:id" element={<BookSetForm />} />
        <Route path="/master-data" element={<MasterData />} />
      </Routes>
    </Layout>
  );
}

export default App;

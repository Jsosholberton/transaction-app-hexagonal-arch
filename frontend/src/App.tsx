import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsListPage from "./components/pages/ProductsListPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsListPage />} />
        {/* Aquí agregaremos más rutas como /products/:id, /transactions... */}
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

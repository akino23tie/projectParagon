import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Layout utama yang punya header dan sidebar */}
      <Route path="/" element={<MainLayout />}>
        {/* Redirect dari root ke /products */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Halaman Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Halaman Produk */}
        <Route path="products" element={<Products />} />

        {/* Tambahkan route lain di sini */}
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>

      {/* Fallback jika route tidak ditemukan */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

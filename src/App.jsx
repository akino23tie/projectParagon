import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Article from "./pages/Article";
import Booking from "./pages/Booking";
import UserAndRole from "./pages/UserAndRole";
import CompanyProfile from "./pages/CompanyProfile";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";

export default function App() {
  return (
    <Routes>
      {/* Layout utama yang punya header */}
      <Route path="/" element={<MainLayout />}>
        {/* Redirect dari root ke dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Halaman utama */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="article" element={<Article />} />
        <Route path="booking" element={<Booking />} />
        <Route path="user-role" element={<UserAndRole />} />
        <Route path="company-profile" element={<CompanyProfile />} />
        <Route path="team" element={<Team />} />
      </Route>

      {/* Fallback jika route tidak ditemukan */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

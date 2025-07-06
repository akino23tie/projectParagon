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
import Testimoni from "./pages/Testimoni";
import Forgot from "./pages/auth/Forgot";
import Register from "./pages/auth/Register";

// Tambahkan ini
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";

export default function App() {
  return (
    <Routes>
      {/* Layout utama yang punya header */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="article" element={<Article />} />
        <Route path="booking" element={<Booking />} />
        <Route path="user-role" element={<UserAndRole />} />
        <Route path="company-profile" element={<CompanyProfile />} />
        <Route path="team" element={<Team />} />
        <Route path="testimoni" element={<Testimoni />} />
      </Route>

      {/* Route utk login*/}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Route fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

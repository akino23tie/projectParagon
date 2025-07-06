import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FiGlobe, FiUser, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", avatar_url: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
  }, []);

  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 my-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive ? "text-white bg-gradient-to-r from-red-400 to-red-300 shadow-md" : "text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-300"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col justify-between z-50 border-r border-gray-200">
      {/* Logo and Branding */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="/img/logoSkinvia.png" alt="Logo Skinvia" className="h-14 w-auto" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto bg-gradient-to-b from-white via-white to-pink-100">
        <NavLink to="/dashboard" className={navItemClass}>
          Dashboard
        </NavLink>
        <NavLink to="/products" className={navItemClass}>
          Produk
        </NavLink>
        <NavLink to="/article" className={navItemClass}>
          Artikel
        </NavLink>
        <NavLink to="/booking" className={navItemClass}>
          Booking
        </NavLink>
        <NavLink to="/user-role" className={navItemClass}>
          Pengguna & Peran
        </NavLink>
        <NavLink to="/company-profile" className={navItemClass}>
          Profil Perusahaan
        </NavLink>
        <NavLink to="/team" className={navItemClass}>
          Tim & Karyawan
        </NavLink>
        <NavLink to="/testimoni" className={navItemClass}>
          Testimoni
        </NavLink>
        <NavLink to="/loker" className={navItemClass}>
          Lowongan Kerja
        </NavLink>
        <NavLink to="/contact" className={navItemClass}>
          Kontak
        </NavLink>
        <NavLink to="/faq" className={navItemClass}>
          FAQ
        </NavLink>
      </nav>

      {/* Guest View */}
      <div className="px-4 py-3 bg-gradient-to-b from-pink-100 via-white to-green-100">
        <a
          href="https://project-rini.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full text-white bg-gradient-to-r from-red-500 to-red-400 border-none hover:from-red-400 hover:to-pink-400 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FiGlobe className="text-lg" />
          <span className="text-sm font-semibold">Guest View</span>
        </a>
      </div>

      {/* Login/Logout */}
      <div className="px-4 py-3 bg-gradient-to-b from-green-100 via-white to-green-200">
        {user.email ? (
          <button onClick={handleLogout} className="btn w-full text-white bg-red-500 hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2">
            <FiLogOut className="text-lg" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        ) : (
          <NavLink to="/auth/login" className="btn w-full text-white bg-gradient-to-r from-red-400 to-green-600 border-none hover:from-green-600 hover:to-green-300 transition-all duration-300 flex items-center justify-center gap-2">
            <FiUser className="text-lg" />
            <span className="text-sm font-semibold">Login</span>
          </NavLink>
        )}
      </div>
    </aside>
  );
}

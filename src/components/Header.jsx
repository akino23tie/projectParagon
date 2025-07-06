import { NavLink } from "react-router-dom";
import { FiGlobe, FiUser } from "react-icons/fi";

export default function Header() {
  const navItemClass = ({ isActive }) =>
    `block w-full text-left text-sm px-4 py-2 rounded-lg transition font-medium ${isActive ? "text-white" : "text-gray-700 hover:text-white hover:bg-red-400"} ${isActive ? "bg-[var(--color-hijau)]" : ""}`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col justify-between z-50 border-r border-gray-200">
      {/* Logo and Branding */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="/img/logoSkinvia.png" alt="Logo Skinvia" className="h-14 w-auto" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <NavLink to="/dashboard" className={navItemClass}>
          Dashboard
        </NavLink>
        <NavLink to="/products" className={navItemClass}>
          Product
        </NavLink>
        <NavLink to="/article" className={navItemClass}>
          Article
        </NavLink>
        <NavLink to="/booking" className={navItemClass}>
          Booking
        </NavLink>
        <NavLink to="/user-role" className={navItemClass}>
          User & Role
        </NavLink>
        <NavLink to="/company-profile" className={navItemClass}>
          Profile Company
        </NavLink>
        <NavLink to="/team" className={navItemClass}>
          Team
        </NavLink>
        <NavLink to="/testimoni" className={navItemClass}>
          Testimoni
        </NavLink>
      </nav>

      {/* Tombol Guest */}
      <div className="px-4 py-10 ">
        <a href="https://project-rini.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full bg-hijau text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-red-400">
          <FiGlobe className="text-lg" />
          <span className="text-sm font-semibold">Guest View</span>
        </a>
      </div>

      {/* Tombol Login */}
      <div className="px-4 py-8 border-t border-gray-200">
        <NavLink to="/auth/login" className="w-full bg-green-400 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-green-600">
          <FiUser className="text-lg" />
          <span className="text-sm font-semibold">Login</span>
        </NavLink>
      </div>
    </aside>
  );
}

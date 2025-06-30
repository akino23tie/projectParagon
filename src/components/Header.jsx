import { NavLink } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { FaGem } from "react-icons/fa";

export default function Header() {
  const navItemClass = ({ isActive }) => `text-sm px-4 py-2 rounded-full transition font-medium ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaGem className="text-xl text-black" />
        <span className="text-lg font-semibold">Skinvia</span>
      </div>

      {/* Center Navigation */}
      <nav className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
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
          Company's Profile
        </NavLink>
      </nav>

      {/* Search & Cart */}
      <div className="flex items-center space-x-4">
        <button className="bg-gray-100 p-2 rounded-full hover:shadow-lg transition">
          <FiSearch className="text-xl" />
        </button>
        <button className="bg-hijau text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-700">
          <FiUser className="text-lg" />
          <span className="text-sm font-semibold">Guest View</span>
        </button>
      </div>
    </header>
  );
}

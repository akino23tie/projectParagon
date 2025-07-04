import { NavLink } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { FaGem } from "react-icons/fa";

export default function Header() {
  const navItemClass = ({ isActive }) =>
    `block w-full text-left text-sm px-4 py-2 rounded-lg transition font-medium ${
      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col justify-between z-50 border-r border-gray-200">
      {/* Logo and Branding */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FaGem className="text-2xl text-black" />
          <span className="text-xl font-semibold">Skinvia</span>
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
      </nav>

      {/* Bottom Guest Info */}
      <div className="px-4 py-5 border-t border-gray-200">
        <button className="w-full bg-hijau text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-green-700">
          <FiUser className="text-lg" />
          <span className="text-sm font-semibold">Guest View</span>
        </button>
      </div>
    </aside>
  );
}

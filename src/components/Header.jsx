import { NavLink } from "react-router-dom";
import { FiGlobe, FiUser } from "react-icons/fi";

export default function Header() {
  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 my-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive ? "text-white bg-gradient-to-r from-red-400 to-red-300 shadow-md" : "text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-300"
    }`;

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
        <NavLink to="/loker" className={navItemClass}>
          Loker
        </NavLink>
        <NavLink to="/contact" className={navItemClass}>
          Contact
        </NavLink>
        <NavLink to="/faq" className={navItemClass}>
          FAQ
        </NavLink>
      </nav>

      {/* Tombol Guest */}
      <div className="px-4 py-4 overflow-y-auto bg-gradient-to-b from-pink-100 via-white to-green-100 ">
        <a
          href="https://project-rini.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full text-white bg-gradient-to-r from-red-500 to-red-400 border-none hover:from-red-400 hover:to-pink-400 transition-all duration-300"
        >
          <FiGlobe className="text-lg" />
          <span className="text-sm font-semibold">Guest View</span>
        </a>
      </div>

      {/* Tombol Login */}
      <div className="px-4 py-4 overflow-y-auto bg-gradient-to-b from-green-100 via-white to-green-200 ">
        <NavLink to="/auth/login" className="btn w-full text-white bg-gradient-to-r from-red-400 to-green-600 border-none hover:from-green  -600 hover:to-green-300 transition-all duration-300">
          <FiUser className="text-lg" />
          <span className="text-sm font-semibold">Login</span>
        </NavLink>
      </div>
    </aside>
  );
}

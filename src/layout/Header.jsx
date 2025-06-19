import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import { FcAreaChart } from "react-icons/fc";

export default function Header() {
  const navLinkClass = ({ isActive }) => `px-4 py-2 rounded-md font-semibold transition ${isActive ? "text-hijau bg-green-200" : "text-gray-600 hover:text-hijau hover:bg-green-100"}`;

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo & Nav */}
      <div className="flex items-center space-x-10">
        <span className="text-2xl font-bold text-gray-900">
          Skinvia <b className="text-hijau">.</b>
        </span>

        {/* Navigation Menu */}
        <nav className="flex space-x-4">
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/userlist" className={navLinkClass}>
            Users
          </NavLink>
          <NavLink to="/error/400" state={{ errorCode: "400" }} className={navLinkClass}>
            Error 400
          </NavLink>
          <NavLink to="/error/401" state={{ errorCode: "401" }} className={navLinkClass}>
            Error 401
          </NavLink>
          <NavLink to="/error/403" state={{ errorCode: "403" }} className={navLinkClass}>
            Error 403
          </NavLink>
        </nav>
      </div>

      {/* Notification, Chart, Settings */}
      <div className="flex items-center space-x-4">
        <div className="relative p-2 rounded-full bg-blue-100 text-blue-500 cursor-pointer">
          <FaBell />
          <span className="absolute -top-2 -right-2 bg-blue-300 text-xs px-2 py-0.5 rounded-full">50</span>
        </div>
        <div className="p-2 bg-blue-100 rounded-full cursor-pointer">
          <FcAreaChart />
        </div>
        <div className="p-2 bg-red-100 rounded-full text-red-500 cursor-pointer">
          <SlSettings />
        </div>
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline text-gray-600">
            Hello, <b>Akino</b>
          </span>
          <img src="https://avatar.iran.liara.run/public/28" alt="Avatar" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </header>
  );
}

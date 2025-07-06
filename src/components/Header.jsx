import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <header className="bg-white h-[72px] px-6 flex items-center justify-end border-b border-gray-200 shadow-sm fixed top-0 left-64 right-0 z-40">
      <div className="flex items-center space-x-6">
        {/* Name & Email */}
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">{user.name || "Guest"}</span>
          <span className="text-xs text-gray-500 truncate max-w-[180px]">{user.email || "Belum login"}</span>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="text-sm text-white bg-gradient-to-r from-red-400 to-red-500 hover:to-red-600 px-3 py-1.5 rounded-md flex items-center space-x-1 shadow">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

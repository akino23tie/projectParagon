import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <Link to="/dashboard" className="px-4 py-2 bg-hijau text-white rounded-md hover:bg-red-400">
        Cancel
      </Link>
    </div>
  );
}

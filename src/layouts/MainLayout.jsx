import Header from "../components/Header"; // Sidebar
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Header />

      {/* Main content */}
      <div className="flex-1 min-h-screen pl-0">
        <main className="p-6 ml-64">
          <Outlet />
        </main>
        <div className="ml-64">
          <Footer />
        </div>
      </div>
    </div>
  );
}

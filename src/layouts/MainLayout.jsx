import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex font-nunito">
      <Sidebar />

      <div className="flex-1 min-h-screen pl-64">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-[72px] p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

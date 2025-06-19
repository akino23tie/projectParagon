import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[96px] px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}

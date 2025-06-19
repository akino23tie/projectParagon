import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

import productsData from "../data/Products.json";
import articlesData from "../data/Articles.json";
import bookingsData from "../data/Bookings.json";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    setProducts(productsData);
    setArticles(articlesData);
    setBookings(bookingsData);

    // pake Data dummy
    setLogins([
      { date: "June 1", logins: 20, bookings: 5, popularArticles: 3 },
      { date: "June 2", logins: 15, bookings: 3, popularArticles: 1 },
      { date: "June 3", logins: 25, bookings: 6, popularArticles: 2 },
    ]);
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      {/* Contoh Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatBox label="Total Products" value={products.length} color="bg-green-100" />
        <StatBox label="Total Articles" value={articles.length} color="bg-blue-100" />
        <StatBox label="Total Bookings" value={bookings.length} color="bg-yellow-100" />
        <StatBox label="Total Visitors" value={logins.reduce((acc, item) => acc + item.logins, 0)} color="bg-pink-100" />
      </div>

      {/* Grafik */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Statistik Mingguan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={logins} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="logins" fill="#34d399" name="User Logins" />
            <Bar dataKey="bookings" fill="#60a5fa" name="Bookings" />
            <Bar dataKey="popularArticles" fill="#f472b6" name="Popular Articles" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Komponen statistik kecil
function StatBox({ label, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-md ${color}`}>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

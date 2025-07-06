import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FiBox, FiFileText, FiCalendar, FiUsers } from "react-icons/fi";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [logins, setLogins] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // Data dummy
    setProducts(Array.from({ length: 45 }, (_, i) => ({ id: i + 1, name: `Produk ${i + 1}` })));
    setArticles(Array.from({ length: 23 }, (_, i) => ({ id: i + 1, title: `Artikel ${i + 1}` })));
    setBookings(Array.from({ length: 12 }, (_, i) => ({ id: i + 1, date: `2024-06-${i + 1}` })));

    setLogins([
      { date: "Sen", logins: 45, bookings: 12, popularArticles: 8 },
      { date: "Sel", logins: 38, bookings: 15, popularArticles: 6 },
      { date: "Rab", logins: 52, bookings: 18, popularArticles: 12 },
      { date: "Kam", logins: 41, bookings: 9, popularArticles: 7 },
      { date: "Jum", logins: 67, bookings: 22, popularArticles: 15 },
      { date: "Sab", logins: 29, bookings: 8, popularArticles: 4 },
      { date: "Min", logins: 34, bookings: 11, popularArticles: 6 },
    ]);

    setPieData([
      { name: "Desktop", value: 65, color: "#3b82f6" },
      { name: "Seluler", value: 28, color: "#10b981" },
      { name: "Tablet", value: 7, color: "#f59e0b" },
    ]);

    fetch("https://zenquotes.io/")
      .then((res) => res.json())
      .then((data) => {
        setQuote({ q: data.content, a: data.author });
      })
      .catch((err) => {
        console.error("Gagal memuat kutipan:", err);
      });
  }, []);

  const totalVisitors = logins.reduce((acc, item) => acc + item.logins, 0);

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-4xl font-bold mb-5" style={{ color: "var(--color-hijau)" }}>
                Dashboard
              </h1>
              {quote ? (
                <p className="text-gray-600 mt-1 italic">
                  "{quote.q}" — <span className="font-medium">{quote.a}</span>
                </p>
              ) : (
                <p className="text-gray-400 mt-1 max-w-xl mx-auto">The only way to produce the best work is to love what you do</p>
              )}
            </div>
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Produk" value={products.length} icon={<FiBox />} />
          <StatCard label="Total Artikel" value={articles.length} icon={<FiFileText />} />
          <StatCard label="Booking Aktif" value={bookings.length} icon={<FiCalendar />} />
          <StatCard label="Pengunjung Mingguan" value={totalVisitors} icon={<FiUsers />} />
        </div>

        {/* Bagian Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="Ringkasan Aktivitas Mingguan" subtitle="Interaksi dan keterlibatan pengguna">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={logins} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  formatter={(value) => {
                    if (value === "logins") return "Login Pengguna";
                    if (value === "bookings") return "Booking";
                    if (value === "popularArticles") return "Artikel Populer";
                    return value;
                  }}
                />
                <Bar dataKey="logins" fill="#3b82f6" name="Login Pengguna" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bookings" fill="#10b981" name="Booking" radius={[4, 4, 0, 0]} />
                <Bar dataKey="popularArticles" fill="#f59e0b" name="Artikel Populer" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Distribusi Penggunaan Perangkat" subtitle="Cara pengguna mengakses platform Anda">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Tren Bulanan" subtitle="Pola pertumbuhan dari waktu ke waktu" fullWidth>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={logins} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                formatter={(value) => {
                  if (value === "logins") return "Login Pengguna";
                  if (value === "bookings") return "Booking";
                  return value;
                }}
              />
              <Line type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }} name="Login Pengguna" />
              <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} name="Booking" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, change = "+0%", changeType = "increase" }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${changeType === "increase" ? "text-green-600" : "text-red-600"}`}>{change}</span>
            <span className="text-gray-500 text-sm ml-1">dibanding minggu lalu</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-[var(--color-hijau)] text-white text-2xl">{icon}</div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, fullWidth = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

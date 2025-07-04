import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, LineChart, Line, PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [logins, setLogins] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    setProducts(Array.from({ length: 45 }, (_, i) => ({ id: i + 1, name: `Product ${i + 1}` })));
    setArticles(Array.from({ length: 23 }, (_, i) => ({ id: i + 1, title: `Article ${i + 1}` })));
    setBookings(Array.from({ length: 12 }, (_, i) => ({ id: i + 1, date: `2024-06-${i + 1}` })));

    setLogins([
      { date: "Mon", logins: 45, bookings: 12, popularArticles: 8 },
      { date: "Tue", logins: 38, bookings: 15, popularArticles: 6 },
      { date: "Wed", logins: 52, bookings: 18, popularArticles: 12 },
      { date: "Thu", logins: 41, bookings: 9, popularArticles: 7 },
      { date: "Fri", logins: 67, bookings: 22, popularArticles: 15 },
      { date: "Sat", logins: 29, bookings: 8, popularArticles: 4 },
      { date: "Sun", logins: 34, bookings: 11, popularArticles: 6 },
    ]);

    setPieData([
      { name: "Desktop", value: 65, color: "#3b82f6" },
      { name: "Mobile", value: 28, color: "#10b981" },
      { name: "Tablet", value: 7, color: "#f59e0b" },
    ]);
  }, []);

  const totalVisitors = logins.reduce((acc, item) => acc + item.logins, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ System Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Products" value={products.length} icon="📦" color="from-blue-500 to-blue-600" change="+12%" changeType="increase" />
          <StatCard label="Total Articles" value={articles.length} icon="📰" color="from-emerald-500 to-emerald-600" change="+8%" changeType="increase" />
          <StatCard label="Active Bookings" value={bookings.length} icon="📅" color="from-amber-500 to-amber-600" change="+23%" changeType="increase" />
          <StatCard label="Weekly Visitors" value={totalVisitors} icon="👥" color="from-purple-500 to-purple-600" change="+5%" changeType="increase" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="Weekly Activity Overview" subtitle="User interactions and engagement">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={logins} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                <Legend />
                <Bar dataKey="logins" fill="#3b82f6" name="User Logins" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bookings" fill="#10b981" name="Bookings" radius={[4, 4, 0, 0]} />
                <Bar dataKey="popularArticles" fill="#f59e0b" name="Popular Articles" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Device Usage Distribution" subtitle="How users access your platform">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Monthly Trends" subtitle="Growth patterns over time" fullWidth>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={logins} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} name="User Logins" />
              <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, change, changeType }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last week</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children, fullWidth = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${fullWidth ? 'col-span-full' : ''}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

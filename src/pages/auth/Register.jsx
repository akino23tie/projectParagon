import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authAPI";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      setLoading(false);
      return;
    }

    const { error } = await registerUser(form.email, form.password, form.name);

    if (error) {
      setError(error.message);
    } else {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/auth/login");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Create Your Account ✨</h2>
      {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">{error}</p>}

      <form onSubmit={handleRegister}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input type="text" name="name" onChange={handleChange} required placeholder="Nama lengkap" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" onChange={handleChange} required placeholder="you@example.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" name="password" onChange={handleChange} required placeholder="********" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
          <input type="password" name="confirmPassword" onChange={handleChange} required placeholder="********" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
          {loading ? "Mendaftarkan..." : "Register"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <NavLink to="/auth/login" className="text-sm text-gray-600 hover:text-green-600">
          Sudah punya akun? Kembali ke Login
        </NavLink>
      </div>
    </div>
  );
}

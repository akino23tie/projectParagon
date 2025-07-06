import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authAPI";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: queryError } = await loginUser(form.email, form.password);

    if (queryError || !data) {
      setError("Email atau password salah.");
    } else {
      // Simpan user ke localStorage agar bisa ditampilkan di sidebar/header
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/"); // login berhasil
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Welcome back, Skinviers!</h2>
      {error && (
        <div className="bg-red-200 mb-5 p-5 text-sm text-gray-600 rounded flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
          {error}
        </div>
      )}
      {loading && (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
          <ImSpinner2 className="me-2 animate-spin" />
          Mohon Tunggu...
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" placeholder="you@example.com" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" name="password" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" placeholder="********" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
          Login
        </button>
        <div className="flex justify-between text-sm mt-4">
          <button type="button" onClick={() => navigate("/auth/forgot")} className="text-green-500 hover:underline">
            Lupa Password?
          </button>
          <button type="button" onClick={() => navigate("/auth/register")} className="text-green-500 hover:underline">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

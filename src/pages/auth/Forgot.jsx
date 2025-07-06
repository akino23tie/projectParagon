import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getPasswordByEmail } from "../../services/authAPI";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const { data, error: queryError } = await getPasswordByEmail(email);

    if (queryError || !data) {
      setError("Email tidak ditemukan.");
    } else {
      setResult(`Password kamu adalah: ${data.password}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Lupa Password?</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">Masukkan email anda dan sistem akan menampilkan password jika ditemukan.</p>

      {result && <p className="bg-green-100 text-green-700 text-sm p-3 rounded mb-4">{result}</p>}
      {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          Lihat Password
        </button>
      </form>

      <div className="mt-4 text-center">
        <NavLink to="/auth/login" className="text-sm text-green-400 hover:text-green-600 mr-4">
          Kembali ke Login
        </NavLink>
        <NavLink to="/auth/register" className="text-sm text-green-400 hover:text-green-600">
          Kembali ke Register
        </NavLink>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";

export default function Forgot() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Lupa Password?</h2>

      <p className="text-sm text-gray-500 mb-6 text-center">Masukkan email anda dan kami akan mengirim link untuk reset password.</p>

      <form>
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300"
        >
          Kirim Link Reset
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

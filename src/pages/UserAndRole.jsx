import { useState, useEffect } from "react";
import { userAndRoleAPI } from "../services/userandrole";

export default function Userandrole() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await userAndRoleAPI.fetchUser();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    const { name, role, email } = formData;

    if (!name || !role || !email) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = { name, role, email };

    try {
      if (editId) {
        await userAndRoleAPI.updateUser(editId, payload);
      } else {
        await userAndRoleAPI.createUser(payload);
      }

      setFormData({ name: "", role: "", email: "" });
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Submit error:", error.message);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      role: user.role,
      email: user.email,
    });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await userAndRoleAPI.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
        Manajemen User & Role
      </h1>

      {/* Form */}
      <div className="max-w-xl mx-auto mb-12 border-l-4 p-6 rounded-lg shadow" style={{ borderColor: "#fff", backgroundColor: "#fff" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
          {editId ? "Edit User" : "Add New User"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
          <input className="input input-bordered w-full col-span-2" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>

        <button className="btn w-full mt-6 bg-[var(--color-hijau)] text-white hover:bg-red-400 transition-colors duration-200" onClick={handleSubmit}>
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full overflow-hidden rounded-xl">
            <thead style={{ backgroundColor: "var(--color-hijau)", color: "#fff" }}>
              <tr className="text-center text-sm font-semibold">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="btn btn-xs"
                      style={{
                        backgroundColor: "var(--color-kuning)",
                        color: "#fff",
                      }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs"
                      style={{
                        backgroundColor: "var(--color-merah)",
                        color: "#fff",
                      }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

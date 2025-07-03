import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ name: "", position: "", email: "" });
  const [editId, setEditId] = useState(null);

  const fetchTeam = async () => {
    const { data, error } = await supabase.from("team").select("*").order("created_at", { ascending: false });
    if (error) console.error("Fetch error:", error.message);
    else setTeam(data);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.position || !formData.email) {
      alert("Please fill all fields.");
      return;
    }

    if (editId) {
      await supabase.from("team").update(formData).eq("id", editId);
    } else {
      await supabase.from("team").insert([formData]);
    }

    setFormData({ name: "", position: "", email: "" });
    setEditId(null);
    fetchTeam();
  };

  const handleEdit = (member) => {
    setFormData({ name: member.name, position: member.position, email: member.email });
    setEditId(member.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("team").delete().eq("id", id);
    fetchTeam();
  };

  return (
    <div className="p-8 min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-center mb-8">Team Management</h1>

      {/* Form */}
      <div className="max-w-md mx-auto mb-12 border p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Team Member" : "Add Team Member"}</h2>
        <input className="input input-bordered w-full mb-2" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="input input-bordered w-full mb-2" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
        <input className="input input-bordered w-full mb-4" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          {editId ? "Update" : "Add"} Member
        </button>
      </div>

      {/* Table */}
      {team.length === 0 ? (
        <p className="text-center text-gray-500">No team members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td>{member.email}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-xs btn-warning" onClick={() => handleEdit(member)}>
                      Edit
                    </button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDelete(member.id)}>
                      Delete
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

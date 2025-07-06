import { useState, useEffect } from "react";
import { teamAPI } from "../services/teamAPI";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    image: "",
    bio: "",
    university: "",
    background: "",
    experience: "",
    skills: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchTeam = async () => {
    try {
      const data = await teamAPI.fetchTeam();
      setTeam(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSubmit = async () => {
    const { name, role, email, image, bio, university, background, experience, skills } = formData;

    if (!name || !role || !email) {
      alert("Please fill all required fields.");
      return;
    }

    const details = {
      university,
      background,
      experience,
      skills: skills.split(",").map((s) => s.trim()),
    };

    const payload = {
      name,
      role,
      email,
      image,
      bio,
      details,
    };

    try {
      if (editId) {
        await teamAPI.updateTeam(editId, payload);
      } else {
        await teamAPI.createTeam(payload);
      }

      setFormData({
        name: "",
        role: "",
        email: "",
        image: "",
        bio: "",
        university: "",
        background: "",
        experience: "",
        skills: "",
      });
      setEditId(null);
      fetchTeam();
    } catch (error) {
      console.error("Submit error:", error.response?.data || error);
    }
  };

  const handleEdit = (member) => {
    const { university = "", background = "", experience = "", skills = [] } = member.details || {};

    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      image: member.image || "",
      bio: member.bio || "",
      university,
      background,
      experience,
      skills: skills.join(", "),
    });
    setEditId(member.id);
  };

  const handleDelete = async (id) => {
    try {
      await teamAPI.deleteTeam(id);
      fetchTeam();
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
        Manajemen Team
      </h1>

      {/* Form */}
      <div className="max-w-2xl mx-auto mb-12 border-l-4 p-6 rounded-lg shadow" style={{ borderColor: "#fff", backgroundColor: "#fff" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
          {editId ? "Edit Member" : "Add New Member"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          <input className="input input-bordered w-full col-span-2" placeholder="Bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="University" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Background" value={formData.background} onChange={(e) => setFormData({ ...formData, background: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Skills (comma-separated)" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
        </div>

        <button className="btn w-full mt-6 bg-[var(--color-hijau)] text-white hover:bg-red-400 transition-colors duration-200" onClick={handleSubmit}>
          {editId ? "Update Member" : "Add Member"}
        </button>
      </div>

      {/* Table */}
      {team.length === 0 ? (
        <p className="text-center text-gray-500">No team members found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full overflow-hidden rounded-xl">
            <thead style={{ backgroundColor: "var(--color-hijau)", color: "#fff" }}>
              <tr className="text-center text-sm font-semibold">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Bio</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, index) => (
                <tr key={member.id} className="text-center hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{member.name}</td>
                  <td className="p-3">{member.role}</td>
                  <td className="p-3">{member.email}</td>
                  <td className="p-3">{member.bio}</td>
                  <td className="p-3">
                    {member.image ? <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover ring-2" style={{ borderColor: "var(--color-hijau)" }} /> : <span className="italic text-gray-500">No image</span>}
                  </td>
                  <td className="p-3 text-sm text-left">
                    <div>
                      <strong>University:</strong> {member.details?.university || "-"}
                    </div>
                    <div>
                      <strong>Background:</strong> {member.details?.background || "-"}
                    </div>
                    <div>
                      <strong>Experience:</strong> {member.details?.experience || "-"}
                    </div>
                    <div>
                      <strong>Skills:</strong> {(member.details?.skills || []).join(", ") || "-"}
                    </div>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="btn btn-xs"
                      style={{
                        backgroundColor: "var(--color-kuning)",
                        color: "#fff",
                      }}
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs"
                      style={{
                        backgroundColor: "var(--color-merah)",
                        color: "#fff",
                      }}
                      onClick={() => handleDelete(member.id)}
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

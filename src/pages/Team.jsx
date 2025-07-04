// Team.jsx
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
    <div className="p-8 min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-center mb-8">Team Management</h1>

      {/* Form */}
      <div className="max-w-2xl mx-auto mb-12 border p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Member" : "Add New Member"}</h2>
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

        <button className="btn btn-primary w-full mt-6" onClick={handleSubmit}>
          {editId ? "Update Member" : "Add Member"}
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
                <th>Role</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Image</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.email}</td>
                  <td>{member.bio}</td>
                  <td>{member.image ? <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" /> : <span className="italic text-gray-500">No image</span>}</td>
                  <td>
                    <div className="text-sm space-y-1">
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
                    </div>
                  </td>
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

import { useState } from "react";
import lokerDataJSON from "../data/Loker.json";

export default function Loker() {
  const [lokerData, setLokerData] = useState(lokerDataJSON);
  const [form, setForm] = useState({
    position: "",
    company: "",
    location: "",
    description: "",
    deadline: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.position || !form.company || !form.location || !form.description || !form.deadline) {
      alert("Lengkapi semua field!");
      return;
    }

    if (editIndex !== null) {
      // Update
      const updated = [...lokerData];
      updated[editIndex] = form;
      setLokerData(updated);
      setEditIndex(null);
    } else {
      // Tambah baru
      setLokerData([...lokerData, form]);
    }

    setForm({
      position: "",
      company: "",
      location: "",
      description: "",
      deadline: "",
    });
  };

  const handleEdit = (index) => {
    const job = lokerData[index];
    setForm(job);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Yakin ingin menghapus lowongan ini?")) return;
    const filtered = lokerData.filter((_, i) => i !== index);
    setLokerData(filtered);
    if (editIndex === index) {
      setForm({
        position: "",
        company: "",
        location: "",
        description: "",
        deadline: "",
      });
      setEditIndex(null);
    }
  };

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundColor: "var(--color-latar)",
        fontFamily: "var(--font-poppins)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Lowongan Kerja
        </h1>

        {/* Daftar Loker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lokerData.map((job, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-sm hover:shadow-lg border transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: "4px solid var(--color-hijau)",
                borderColor: "var(--color-garis)",
                fontFamily: "var(--font-barlow)",
              }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--color-hijau)" }}>
                {job.position}
              </h3>
              <p className="text-sm mb-2" style={{ color: "var(--color-teks-samping)" }}>
                {job.company} &middot; {job.location}
              </p>
              <p className="text-sm text-justify line-clamp-5 mb-4" style={{ color: "var(--color-teks)" }}>
                {job.description}
              </p>
              <div className="text-sm mb-3" style={{ color: "var(--color-teks-samping)" }}>
                <strong>Batas Pendaftaran:</strong> {job.deadline}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-xs" style={{ backgroundColor: "var(--color-kuning)", color: "#fff" }} onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="btn btn-xs" style={{ backgroundColor: "var(--color-merah)", color: "#fff" }} onClick={() => handleDelete(index)}>
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form Tambah / Edit */}
        <div
          className="p-6 rounded-xl shadow-md border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "var(--color-garis)",
            fontFamily: "var(--font-barlow)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: "var(--color-hijau)" }}>
            {editIndex !== null ? "Edit Lowongan" : "Tambah Lowongan Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="position" value={form.position} onChange={handleChange} placeholder="Posisi" className="border px-4 py-2 rounded-md" required />
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Perusahaan" className="border px-4 py-2 rounded-md" required />
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Lokasi" className="border px-4 py-2 rounded-md" required />
            <input type="text" name="deadline" value={form.deadline} onChange={handleChange} placeholder="Batas Pendaftaran (cth: 31 Juli 2025)" className="border px-4 py-2 rounded-md" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi pekerjaan" rows={4} className="md:col-span-2 border px-4 py-2 rounded-md resize-none" required></textarea>
            <button type="submit" className="md:col-span-2 w-full bg-hijau text-white py-2 rounded-md hover:bg-red-400 transition">
              {editIndex !== null ? "Update Lowongan" : "Tambah Lowongan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

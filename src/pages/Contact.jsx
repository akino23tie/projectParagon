import { useEffect, useState } from "react";
import { contactAPI } from "../services/contactAPI";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    pesan: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchContacts = async () => {
    try {
      const data = await contactAPI.fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async () => {
    const { nama, email, no_hp, pesan } = formData;

    if (!nama || !email || !no_hp || !pesan) {
      alert("Mohon lengkapi semua kolom.");
      return;
    }

    try {
      if (editId) {
        await contactAPI.updateContact(editId, formData);
      } else {
        await contactAPI.createContact(formData);
      }

      setFormData({ nama: "", email: "", no_hp: "", pesan: "" });
      setEditId(null);
      fetchContacts();
    } catch (error) {
      console.error("Submit error:", error.message);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      nama: item.nama,
      email: item.email,
      no_hp: item.no_hp,
      pesan: item.pesan,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    try {
      await contactAPI.deleteContact(id);
      fetchContacts();
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
        Manajemen Kontak
      </h1>

      {/* Form Input */}
      <div className="max-w-2xl mx-auto mb-12 border-l-4 p-6 rounded-lg shadow" style={{ borderColor: "var(--color-garis)", backgroundColor: "#fff" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
          {editId ? "Edit Kontak" : "Tambah Kontak"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="Nama" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="No HP" value={formData.no_hp} onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })} />
          <textarea className="input input-bordered w-full col-span-2" placeholder="Pesan" value={formData.pesan} onChange={(e) => setFormData({ ...formData, pesan: e.target.value })} />
        </div>

        <button className="btn w-full mt-6 bg-[var(--color-hijau)] text-white hover:bg-red-400 transition-colors duration-200" onClick={handleSubmit}>
          {editId ? "Perbarui Kontak" : "Kirim Kontak"}
        </button>
      </div>

      {/* Tabel Kontak */}
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada pesan masuk.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full overflow-hidden rounded-xl">
            <thead style={{ backgroundColor: "var(--color-hijau)", color: "#fff" }}>
              <tr className="text-center text-sm font-semibold">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">No HP</th>
                <th className="py-3 px-4">Pesan</th>
                <th className="py-3 px-4">Waktu</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={c.id} className="text-center hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{c.nama}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.no_hp}</td>
                  <td className="p-3 text-left">{c.pesan}</td>
                  <td className="p-3 text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button className="btn btn-xs" style={{ backgroundColor: "var(--color-kuning)", color: "#fff" }} onClick={() => handleEdit(c)}>
                      Edit
                    </button>
                    <button className="btn btn-xs" style={{ backgroundColor: "var(--color-merah)", color: "#fff" }} onClick={() => handleDelete(c.id)}>
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

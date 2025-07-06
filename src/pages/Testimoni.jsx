import { useEffect, useState } from "react";
import { testimoniAPI } from "../services/testimoniAPI";

export default function Testimoni() {
  const [testimoni, setTestimoni] = useState([]);
  const [form, setForm] = useState({
    name: "",
    testimonial: "",
    rating: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchTestimoni = async () => {
    try {
      const data = await testimoniAPI.fetchTestimoni();
      setTestimoni(data);
    } catch (error) {
      console.error("Fetch error:", error.message || error);
    }
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.testimonial || !form.rating || !form.image) {
      alert("Lengkapi semua field!");
      return;
    }

    const payload = {
      name: form.name,
      testimonial: form.testimonial,
      rating: Number(form.rating),
      image: form.image,
    };

    try {
      if (editId) {
        await testimoniAPI.updateTestimoni(editId, payload);
      } else {
        await testimoniAPI.createTestimoni(payload);
      }

      setForm({
        name: "",
        testimonial: "",
        rating: "",
        image: "",
      });
      setEditId(null);
      fetchTestimoni();
    } catch (error) {
      console.error("Submit error:", error.message || error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      testimonial: item.testimonial || "",
      rating: item.rating?.toString() || "",
      image: item.image || "",
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus testimoni ini?")) return;
    try {
      await testimoniAPI.deleteTestimoni(id);
      fetchTestimoni();
    } catch (error) {
      console.error("Delete error:", error.message || error);
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Testimoni Pelanggan
        </h1>

        {/* Form */}
        <div className="max-w-2xl mx-auto mb-10 border-l-4 p-6 rounded-lg shadow" style={{ borderColor: "#fff", backgroundColor: "#fff" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
            {editId ? "Edit Testimoni" : "Tambah Testimoni Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Nama" value={form.name} onChange={handleChange} className="input input-bordered w-full" />
            <input type="text" name="image" placeholder="URL Foto" value={form.image} onChange={handleChange} className="input input-bordered w-full" />
            <textarea name="testimonial" placeholder="Testimoni" value={form.testimonial} onChange={handleChange} rows={3} className="input input-bordered w-full sm:col-span-2"></textarea>
            <input type="number" name="rating" placeholder="Rating (1-5)" value={form.rating} onChange={handleChange} className="input input-bordered w-full" min={1} max={5} />
            <button type="submit" className="btn w-full sm:col-span-2 mt-4 bg-[var(--color-hijau)] text-white hover:bg-red-400 transition-colors duration-200">
              {editId ? "Update Testimoni" : "Add Testimoni"}
            </button>
          </form>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimoni.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl shadow-sm hover:shadow-lg border transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: "4px solid var(--color-hijau)",
                borderColor: "var(--color-garis)",
                fontFamily: "var(--font-barlow)",
              }}
            >
              <div className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h3 className="text-base font-semibold" style={{ color: "var(--color-hijau)" }}>
                    {item.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-teks-samping)" }}>
                    Rating: {item.rating}
                  </p>
                </div>
              </div>
              <p className="text-sm text-justify line-clamp-5" style={{ color: "var(--color-teks)" }}>
                "{item.testimonial}"
              </p>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-xs" style={{ backgroundColor: "var(--color-kuning)", color: "#fff" }} onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-xs" style={{ backgroundColor: "var(--color-merah)", color: "#fff" }} onClick={() => handleDelete(item.id)}>
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {testimoni.length === 0 && <div className="col-span-full text-center text-gray-500">Belum ada testimoni.</div>}
        </div>
      </div>
    </div>
  );
}

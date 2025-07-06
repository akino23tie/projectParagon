import { useEffect, useState } from "react";
import { galeryAPI } from "../services/galeryAPI";

export default function Galery() {
  const [galery, setGalery] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    url: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchGalery = async () => {
    try {
      const data = await galeryAPI.fetchGalery();
      setGalery(data);
      console.log("Galery fetched:", data);
    } catch (error) {
      console.error("Fetch galery error:", error);
    }
  };

  useEffect(() => {
    fetchGalery();
  }, []);

  const handleSubmit = async () => {
    if (!formData.type || !formData.title || !formData.url) {
      alert("Please complete all fields.");
      return;
    }

    const payload = {
      type: formData.type.trim(),
      title: formData.title.trim(),
      url: formData.url.trim(),
    };

    try {
      if (editId) {
        await galeryAPI.updateGalery(editId, payload);
      } else {
        await galeryAPI.createGalery(payload);
      }
      setFormData({ type: "", title: "", url: "" });
      setEditId(null);
      fetchGalery();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      type: item.type || "",
      title: item.title || "",
      url: item.url || "",
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await galeryAPI.deleteGalery(id);
      fetchGalery();
    } catch (error) {
      console.error("Delete error:", error);
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Manajemen Galeri Produk
        </h1>

        {/* Form */}
        <div
          className="max-w-2xl mx-auto mb-10 border rounded-lg p-6 shadow"
          style={{
            backgroundColor: "#fff",
            borderColor: "var(--color-garis)",
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
            {editId ? "Edit Galery" : "Add New Galery"}
          </h2>

          <input className="input input-bordered w-full mb-2" placeholder="Type (e.g. image, video)" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
          <input className="input input-bordered w-full mb-2" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <input className="input input-bordered w-full mb-4" placeholder="URL" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />

          <button
            className="btn w-full text-white"
            style={{
              backgroundColor: "var(--color-hijau)",
              borderColor: "var(--color-hijau)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f87171")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "var(--color-hijau)")}
            onClick={handleSubmit}
          >
            {editId ? "Update Galery" : "Add Galery"}
          </button>
        </div>

        {/* Galery Table */}
        <div className="overflow-x-auto rounded-xl shadow border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full">
            <thead
              style={{
                backgroundColor: "var(--color-hijau)",
                color: "#fff",
              }}
            >
              <tr className="text-center">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">URL</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {galery.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Galery is empty
                  </td>
                </tr>
              ) : (
                galery.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center hover:bg-gray-50 transition-all"
                    style={{
                      fontFamily: "var(--font-barlow)",
                      color: "var(--color-teks)",
                    }}
                  >
                    <td className="py-3 px-4 border-t">{index + 1}</td>
                    <td className="py-3 px-4 border-t">{item.type}</td>
                    <td className="py-3 px-4 border-t">{item.title}</td>
                    <td className="py-3 px-4 border-t">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        View
                      </a>
                    </td>
                    <td className="py-3 px-4 border-t flex justify-center gap-2">
                      <button
                        className="btn btn-xs"
                        style={{
                          backgroundColor: "var(--color-kuning)",
                          color: "#fff",
                        }}
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs"
                        style={{
                          backgroundColor: "var(--color-merah)",
                          color: "#fff",
                        }}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

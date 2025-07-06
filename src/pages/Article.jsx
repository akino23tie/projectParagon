import { useEffect, useState } from "react";
import { articleAPI } from "../services/articleAPI";

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", content: "" });
  const [editId, setEditId] = useState(null);

  const fetchArticles = async () => {
    try {
      const data = await articleAPI.fetchArticles();
      setArticles(data.sort((a, b) => new Date(b.date) - new Date(a.date))); // urut terbaru dulu
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.content) {
      alert("Harap lengkapi semua field.");
      return;
    }

    try {
      if (editId) {
        await articleAPI.updateArticle(editId, form);
      } else {
        await articleAPI.createArticle(form);
      }
      setForm({ title: "", date: "", content: "" });
      setEditId(null);
      fetchArticles();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.message || JSON.stringify(error));
    }
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title,
      date: article.date,
      content: article.content,
    });
    setEditId(article.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    try {
      await articleAPI.deleteArticle(id);
      fetchArticles();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Manajemen Artikel
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-10 grid gap-4 sm:grid-cols-2">
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Judul Artikel" className="p-3 rounded-xl border" style={{ fontFamily: "var(--font-barlow)" }} />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="p-3 rounded-xl border" style={{ fontFamily: "var(--font-barlow)" }} />
          <textarea name="content" value={form.content} onChange={handleChange} rows={4} placeholder="Konten artikel..." className="p-3 rounded-xl border sm:col-span-2" style={{ fontFamily: "var(--font-barlow)" }} />
          <button type="submit" className="sm:col-span-2 text-white py-2 rounded-full transition-all" style={{ backgroundColor: "var(--color-hijau)" }}>
            {editId ? "Perbarui Artikel" : "Tambah Artikel"}
          </button>
        </form>

        {/* Daftar Artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-xl shadow-sm hover:shadow-lg border transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: "4px solid var(--color-hijau)",
                borderColor: "var(--color-garis)",
                fontFamily: "var(--font-barlow)",
              }}
            >
              <h2 className="text-xl font-semibold mb-2 line-clamp-2" style={{ color: "var(--color-teks)" }}>
                {article.title}
              </h2>
              <p className="text-sm mb-2" style={{ color: "var(--color-teks-samping)" }}>
                {article.date}
              </p>
              <p className="text-sm text-justify line-clamp-4" style={{ color: "var(--color-teks)" }}>
                {article.content}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button onClick={() => handleEdit(article)} className="text-sm font-medium hover:underline" style={{ color: "var(--color-hijau)" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(article.id)} className="text-sm font-medium text-red-500 hover:underline">
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {articles.length === 0 && <p className="text-center text-gray-500">Belum ada artikel.</p>}
        </div>
      </div>
    </div>
  );
}

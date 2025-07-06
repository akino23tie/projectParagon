import { useEffect, useState } from "react";
import { faqAPI } from "../services/faqAPI";

export default function Faq() {
  const [faqData, setFaqData] = useState([]);
  const [form, setForm] = useState({
    category: "",
    question: "",
    answer: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchFaqs = async () => {
    try {
      const data = await faqAPI.fetchFaqs();
      setFaqData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.question || !form.answer) {
      alert("Lengkapi semua field.");
      return;
    }

    try {
      if (editId) {
        await faqAPI.updateFaq(editId, form);
      } else {
        await faqAPI.createFaq(form);
      }

      setForm({ category: "", question: "", answer: "" });
      setEditId(null);
      fetchFaqs();
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.message || JSON.stringify(error));
    }
  };

  const handleEdit = (faq) => {
    setForm({
      category: faq.category || "",
      question: faq.question || "",
      answer: faq.answer || "",
    });
    setEditId(faq.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus FAQ ini?")) return;
    try {
      await faqAPI.deleteFaq(id);
      fetchFaqs();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || JSON.stringify(error));
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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          FAQ Management
        </h1>

        {/* Form Manajemen FAQ - sekarang berada di atas */}
        <div
          className="p-6 rounded-xl shadow-md border mb-16"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "var(--color-garis)",
            fontFamily: "var(--font-barlow)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: "var(--color-hijau)" }}>
            {editId ? "Edit FAQ" : "Tambah Pertanyaan Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Kategori" className="border px-4 py-2 rounded-md" required />
            <input type="text" name="question" value={form.question} onChange={handleChange} placeholder="Pertanyaan" className="border px-4 py-2 rounded-md" required />
            <textarea name="answer" value={form.answer} onChange={handleChange} placeholder="Jawaban" rows={4} className="border px-4 py-2 rounded-md resize-none" required></textarea>
            <button type="submit" className="w-full bg-[var(--color-hijau)] text-white py-2 rounded-md hover:bg-red-400 transition">
              {editId ? "Update FAQ" : "Tambah FAQ"}
            </button>
          </form>
        </div>

        {/* Daftar FAQ */}
        <div className="space-y-6">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl shadow-sm hover:shadow-md border transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: "4px solid var(--color-hijau)",
                borderColor: "var(--color-garis)",
                fontFamily: "var(--font-barlow)",
              }}
            >
              <h4 className="text-sm font-bold mb-1" style={{ color: "var(--color-kuning)" }}>
                {item.category}
              </h4>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-hijau)" }}>
                {item.question}
              </h3>
              <p className="text-sm text-justify" style={{ color: "var(--color-teks)" }}>
                {item.answer}
              </p>
              <div className="mt-4 flex gap-2">
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
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {faqData.length === 0 && <p className="text-center text-gray-500">Belum ada FAQ.</p>}
        </div>
      </div>
    </div>
  );
}

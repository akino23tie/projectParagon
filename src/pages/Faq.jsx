import { useState } from "react";
import faqDataJSON from "../data/Faq.json";

export default function Faq() {
  const [faqData, setFaqData] = useState(faqDataJSON);
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.question && form.answer) {
      setFaqData([...faqData, form]);
      setForm({ question: "", answer: "" });
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

        {/* Daftar FAQ */}
        <div className="space-y-6 mb-16">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-sm hover:shadow-md border transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: "4px solid var(--color-hijau)",
                borderColor: "var(--color-garis)",
                fontFamily: "var(--font-barlow)",
              }}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-hijau)" }}>
                {item.question}
              </h3>
              <p className="text-sm text-justify" style={{ color: "var(--color-teks)" }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Form Manajemen FAQ */}
        <div
          className="p-6 rounded-xl shadow-md border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "var(--color-garis)",
            fontFamily: "var(--font-barlow)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: "var(--color-hijau)" }}>
            Tambah Pertanyaan Baru
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input type="text" name="question" value={form.question} onChange={handleChange} placeholder="Pertanyaan" className="border px-4 py-2 rounded-md" required />
            <textarea name="answer" value={form.answer} onChange={handleChange} placeholder="Jawaban" rows={4} className="border px-4 py-2 rounded-md resize-none" required></textarea>
            <button type="submit" className="w-full bg-hijau text-white py-2 rounded-md hover:bg-green-600 transition">
              Tambah FAQ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

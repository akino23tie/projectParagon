import contactData from "../data/Contact.json";

export default function Contact() {
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
          Daftar Kontak Masuk
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactData.map((msg, index) => (
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
              <div className="mb-2">
                <h3 className="text-lg font-semibold" style={{ color: "var(--color-hijau)" }}>
                  {msg.name}
                </h3>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>
              <p className="text-sm font-semibold mb-1 text-gray-700">{msg.subject}</p>
              <p className="text-sm text-justify mb-3" style={{ color: "var(--color-teks)" }}>
                {msg.message}
              </p>
              <p className="text-xs text-right text-gray-400">{msg.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import testimoni from "../data/Testimoni.json";

export default function Testimoni() {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Testimoni Pelanggan
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimoni.map((item, index) => (
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
              <div className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h3 className="text-base font-semibold" style={{ color: "var(--color-hijau)" }}>
                    {item.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-teks-samping)" }}>
                    {item.date}
                  </p>
                </div>
              </div>
              <p className="text-sm text-justify line-clamp-5" style={{ color: "var(--color-teks)" }}>
                "{item.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

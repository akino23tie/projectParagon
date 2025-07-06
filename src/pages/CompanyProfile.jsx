export default function CompanyProfile() {
  const company = {
    name: "Skinvia Cosmetics",
    description: "Kami adalah brand lokal yang fokus pada skincare alami dan aman untuk semua jenis kulit.",
    address: "Jl. Kembang Sari No. 45,Rumbai. Pekanbaru",
    phone: "0822-8510-0306",
    email: "skinvia@gmail.com",
    social: {
      instagram: "@skinvia.id",
      facebook: "fb.com/skinvia",
    },
    logo: "/images/logo-skinvia.png",
  };

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundColor: "var(--color-latar)",
        fontFamily: "var(--font-poppins)",
      }}
    >
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
        Manajemen Profil Perusahaan
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Logo Perusahaan */}
        <div className="flex justify-center mb-6">
          <img src="/img/logoSkinvia.png" alt="Logo Skinvia" className="w-28 h-12 object-contain rounded-md border border-gray-300 p-1 shadow-sm" />
        </div>

        <dl className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-2">
            <dt className="font-semibold text-gray-600">Nama Perusahaan:</dt>
            <dd className="text-gray-800">{company.name}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-semibold text-gray-600">Deskripsi:</dt>
            <dd className="text-gray-800 text-right">{company.description}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-semibold text-gray-600">Alamat:</dt>
            <dd className="text-gray-800">{company.address}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-semibold text-gray-600">Telepon:</dt>
            <dd className="text-gray-800">{company.phone}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-semibold text-gray-600">Email:</dt>
            <dd className="text-gray-800">{company.email}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-semibold text-gray-600">Instagram:</dt>
            <dd className="text-gray-800">{company.social.instagram}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-semibold text-gray-600">Facebook:</dt>
            <dd className="text-gray-800">{company.social.facebook}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

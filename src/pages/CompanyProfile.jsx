export default function CompanyProfile() {
  const company = {
    name: "Skinvia Cosmetics",
    description: "Kami adalah brand lokal yang fokus pada skincare alami dan aman untuk semua jenis kulit.",
    address: "Jl. Kecantikan No. 45, Jakarta",
    phone: "0812-3456-7890",
    email: "info@skinvia.co.id",
    social: {
      instagram: "@skinvia_id",
      facebook: "fb.com/skinvia",
    },
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

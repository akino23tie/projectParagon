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
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Company Profile</h1>
      <div className="space-y-4 text-sm">
        <p>
          <strong>Nama:</strong> {company.name}
        </p>
        <p>
          <strong>Deskripsi:</strong> {company.description}
        </p>
        <p>
          <strong>Alamat:</strong> {company.address}
        </p>
        <p>
          <strong>Telepon:</strong> {company.phone}
        </p>
        <p>
          <strong>Email:</strong> {company.email}
        </p>
        <p>
          <strong>Instagram:</strong> {company.social.instagram}
        </p>
        <p>
          <strong>Facebook:</strong> {company.social.facebook}
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { companyProfileAPI } from "../services/companyprofileAPI";

export default function CompanyProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    logo: "",
    instagram: "",
    facebook: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await companyProfileAPI.fetchProfile();
      if (data) {
        setProfile(data);
        setFormData({
          name: data.name,
          description: data.description,
          address: data.address,
          phone: data.phone,
          email: data.email,
          logo: data.logo,
          instagram: data.social?.instagram || "",
          facebook: data.social?.facebook || "",
        });
        setEditId(data.id);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      logo: formData.logo,
      social: {
        instagram: formData.instagram,
        facebook: formData.facebook,
      },
    };

    try {
      if (editId) {
        await companyProfileAPI.updateProfile(editId, payload);
      } else {
        await companyProfileAPI.createProfile(payload);
      }
      fetchProfile();
    } catch (error) {
      console.error("Submit error:", error.message);
    }
  };

  const handleDelete = async () => {
    if (!editId) return;
    try {
      await companyProfileAPI.deleteProfile(editId);
      setFormData({
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        logo: "",
        instagram: "",
        facebook: "",
      });
      setEditId(null);
      setProfile(null);
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
        Manajemen Profil Perusahaan
      </h1>

      {/* Form */}
      <div className="max-w-2xl mx-auto mb-12 border-l-4 p-6 rounded-lg shadow bg-white" style={{ borderColor: "#fff" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
          {editId ? "Edit Profil" : "Tambah Profil"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="Nama Perusahaan" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Logo URL" value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Telepon" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input className="input input-bordered w-full col-span-2" placeholder="Alamat" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Instagram" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} />
          <input className="input input-bordered w-full" placeholder="Facebook" value={formData.facebook} onChange={(e) => setFormData({ ...formData, facebook: e.target.value })} />
          <textarea className="textarea textarea-bordered w-full col-span-2" placeholder="Deskripsi" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>

        <button className="btn w-full mt-6 bg-[var(--color-hijau)] text-white hover:bg-red-400" onClick={handleSubmit}>
          {editId ? "Update Profil" : "Simpan Profil"}
        </button>

        {editId && (
          <button className="btn w-full mt-2 bg-red-600 text-white hover:bg-red400" onClick={handleDelete}>
            Hapus Profil
          </button>
        )}
      </div>

      {/* Tampilan Profil */}
      {profile && (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <div className="flex justify-center mb-6">
            <img src={profile.logo} alt="Logo" className="w-28 h-12 object-contain rounded-md border border-gray-300 p-1 shadow-sm" />
          </div>

          <dl className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <dt className="font-semibold text-gray-600">Nama Perusahaan:</dt>
              <dd className="text-gray-800">{profile.name}</dd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <dt className="font-semibold text-gray-600">Deskripsi:</dt>
              <dd className="text-gray-800 text-right">{profile.description}</dd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <dt className="font-semibold text-gray-600">Alamat:</dt>
              <dd className="text-gray-800">{profile.address}</dd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <dt className="font-semibold text-gray-600">Telepon:</dt>
              <dd className="text-gray-800">{profile.phone}</dd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <dt className="font-semibold text-gray-600">Email:</dt>
              <dd className="text-gray-800">{profile.email}</dd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <dt className="font-semibold text-gray-600">Instagram:</dt>
              <dd className="text-gray-800">{profile.social?.instagram}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-gray-600">Facebook:</dt>
              <dd className="text-gray-800">{profile.social?.facebook}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

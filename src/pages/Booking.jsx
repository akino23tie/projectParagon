import { useEffect, useState } from "react";
import { bookingAPI } from "../services/bookingAPI";
import { FiEdit2, FiPlus, FiTrash } from "react-icons/fi";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    product_name: "",
    price: "",
    quantity: "",
    totalPrice: "",
    paymentMethod: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const total = Number(formData.price) * Number(formData.quantity);
    setFormData((prev) => ({ ...prev, totalPrice: total || "" }));
  }, [formData.price, formData.quantity]);

  const fetchBookings = async () => {
    try {
      const data = await bookingAPI.fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await bookingAPI.updateBooking(editId, formData);
      } else {
        await bookingAPI.createBooking(formData);
      }
      setFormData({
        name: "",
        address: "",
        product_name: "",
        price: "",
        quantity: "",
        totalPrice: "",
        paymentMethod: "",
      });
      setEditId(null);
      fetchBookings();
    } catch (error) {
      console.error("Submit error:", error.message);
    }
  };

  const handleEdit = (booking) => {
    setFormData(booking);
    setEditId(booking.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus booking ini?")) {
      try {
        await bookingAPI.deleteBooking(id);
        fetchBookings();
      } catch (error) {
        console.error("Delete error:", error.message);
      }
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
        Manajemen Booking
      </h1>

      {/* Form */}
      <div className="max-w-3xl mx-auto mb-12 border-l-4 p-6 rounded-lg shadow" style={{ borderColor: "#fff", backgroundColor: "#fff" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
          {editId ? "Edit Booking" : "Tambah Booking Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input input-bordered w-full" placeholder="Nama Pemesan" name="name" value={formData.name} onChange={handleChange} required />
          <input className="input input-bordered w-full" placeholder="Alamat" name="address" value={formData.address} onChange={handleChange} />
          <input className="input input-bordered w-full" placeholder="Nama Produk" name="product_name" value={formData.product_name} onChange={handleChange} required />
          <input className="input input-bordered w-full" type="number" placeholder="Harga" name="price" value={formData.price} onChange={handleChange} required />
          <input className="input input-bordered w-full" type="number" placeholder="Jumlah" name="quantity" value={formData.quantity} onChange={handleChange} required />
          <input className="input input-bordered w-full bg-gray-100" type="number" placeholder="Total Harga" name="totalPrice" value={formData.totalPrice} readOnly />
          <input className="input input-bordered w-full col-span-2" placeholder="Metode Pembayaran" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required />
          <button type="submit" className="btn w-full col-span-2 mt-4 bg-[var(--color-hijau)] text-white hover:bg-red-400 transition">
            {editId ? (
              <span className="flex items-center gap-2">
                <FiEdit2 /> Perbarui Booking
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FiPlus /> Tambah Booking
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Table */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada data booking.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full overflow-hidden rounded-xl">
            <thead style={{ backgroundColor: "var(--color-hijau)", color: "#fff" }}>
              <tr className="text-center text-sm font-semibold">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">Alamat</th>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4">Jumlah</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Pembayaran</th>
                <th className="py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={b.id} className="text-center hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">{b.address}</td>
                  <td className="p-3">{b.product_name}</td>
                  <td className="p-3">{b.price}</td>
                  <td className="p-3">{b.quantity}</td>
                  <td className="p-3">{b.totalPrice}</td>
                  <td className="p-3">{b.paymentMethod}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="btn btn-xs" style={{ backgroundColor: "var(--color-kuning)", color: "#fff" }} onClick={() => handleEdit(b)}>
                      Edit
                    </button>
                    <button className="btn btn-xs" style={{ backgroundColor: "var(--color-merah)", color: "#fff" }} onClick={() => handleDelete(b.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

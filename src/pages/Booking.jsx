import { useEffect, useState } from "react";
import { bookingAPI } from "../services/BookingAPI";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    product_name: "",
    price: "",
    quantity: "",
    totalPrice: "",
    paymentMeth: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchBookings = async () => {
    try {
      const data = await bookingAPI.fetchBookings();
      setBookings(data);
    } catch (error) {
      console.error("Fetch error:", error.message || error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async () => {
    const { name, address, product_name, price, quantity, totalPrice, paymentMeth } = formData;

    if (!name || !address || !product_name || !price || !quantity || !paymentMeth) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      name,
      address,
      product_name,
      price: Number(price),
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      paymentMeth,
    };

    try {
      if (editId) {
        await bookingAPI.updateBooking(editId, payload);
      } else {
        await bookingAPI.createBooking(payload);
      }

      setFormData({
        name: "",
        address: "",
        product_name: "",
        price: "",
        quantity: "",
        totalPrice: "",
        paymentMeth: "",
      });
      setEditId(null);
      fetchBookings();
    } catch (error) {
      console.error("Submit error:", error.message || error);
    }
  };

  const handleEdit = (booking) => {
    setFormData({
      name: booking.name || "",
      address: booking.address || "",
      product_name: booking.product_name || "",
      price: booking.price || "",
      quantity: booking.quantity || "",
      totalPrice: booking.totalPrice || "",
      paymentMeth: booking.paymentMeth || "",
    });
    setEditId(booking.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await bookingAPI.deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error("Delete error:", error.message || error);
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Booking Management
        </h1>

        {/* Form */}
        <div className="max-w-3xl mx-auto mb-10 border-l-4 p-6 rounded-lg shadow" style={{ borderColor: "#fff", backgroundColor: "#fff" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-teks)" }}>
            {editId ? "Edit Booking" : "Add New Booking"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input input-bordered w-full" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input className="input input-bordered w-full" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            <input className="input input-bordered w-full" placeholder="Product Name" value={formData.product_name} onChange={(e) => setFormData({ ...formData, product_name: e.target.value })} />
            <input className="input input-bordered w-full" type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <input className="input input-bordered w-full" type="number" placeholder="Quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
            <input className="input input-bordered w-full" type="number" placeholder="Total Price" value={formData.totalPrice} onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })} />
            <select className="input input-bordered w-full" value={formData.paymentMeth} onChange={(e) => setFormData({ ...formData, paymentMeth: e.target.value })}>
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>

          <button className="btn w-full mt-6 bg-[var(--color-hijau)] text-white hover:bg-red-400 transition-colors duration-200" onClick={handleSubmit}>
            {editId ? "Update Booking" : "Add Booking"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full text-sm">
            <thead
              style={{
                backgroundColor: "var(--color-hijau)",
                color: "#fff",
              }}
            >
              <tr className="text-center">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Total Price</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="text-center hover:bg-gray-50 transition-all"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    color: "var(--color-teks)",
                  }}
                >
                  <td className="py-3 px-4 border-t">{booking.name}</td>
                  <td className="py-3 px-4 border-t">{booking.address}</td>
                  <td className="py-3 px-4 border-t">{booking.product_name}</td>
                  <td className="py-3 px-4 border-t">{booking.price}</td>
                  <td className="py-3 px-4 border-t">{booking.quantity}</td>
                  <td className="py-3 px-4 border-t">{booking.totalPrice}</td>
                  <td className="py-3 px-4 border-t">{booking.paymentMeth}</td>
                  <td className="py-3 px-4 border-t flex justify-center gap-2">
                    <button
                      className="btn btn-xs"
                      style={{
                        backgroundColor: "var(--color-kuning)",
                        color: "#fff",
                      }}
                      onClick={() => handleEdit(booking)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs"
                      style={{
                        backgroundColor: "var(--color-merah)",
                        color: "#fff",
                      }}
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

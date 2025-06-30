import bookings from "../data/Booking.json";

export default function Booking() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="border p-2">{booking.name}</td>
              <td className="border p-2">{booking.service}</td>
              <td className="border p-2">{booking.date}</td>
              <td className="border p-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

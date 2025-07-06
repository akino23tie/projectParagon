import bookings from "../data/Booking.json";

export default function Booking() {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "var(--color-latar)", fontFamily: "var(--font-poppins)" }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: "var(--color-hijau)" }}>
          Booking Management
        </h1>

        <div className="overflow-x-auto rounded-xl shadow border" style={{ borderColor: "var(--color-garis)" }}>
          <table className="table w-full text-sm">
            <thead style={{ backgroundColor: "var(--color-hijau)", color: "#fff" }}>
              <tr className="text-center">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Service</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="text-center hover:bg-gray-50 transition-all" style={{ fontFamily: "var(--font-barlow)", color: "var(--color-teks)" }}>
                  <td className="py-3 px-4 border-t">{booking.name}</td>
                  <td className="py-3 px-4 border-t">{booking.service}</td>
                  <td className="py-3 px-4 border-t">{booking.date}</td>
                  <td className="py-3 px-4 border-t">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

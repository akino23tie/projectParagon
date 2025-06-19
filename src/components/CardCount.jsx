export default function CardCount({ icon, value, label, bgColor }) {
  return (
    <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
      <div className={`${bgColor} rounded-full p-4 text-white text-xl`}>{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500">{label}</div>
      </div>
    </div>
  );
}

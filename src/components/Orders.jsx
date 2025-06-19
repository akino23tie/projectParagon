import React from "react";

const Orders = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order</h1>
          <p className="text-sm text-gray-500">Dashboard / Order List</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg">Add New Order</button>
      </div>

      <p className="text-gray-800">Ini Halaman Order</p>
    </div>
  );
};

export default Orders;

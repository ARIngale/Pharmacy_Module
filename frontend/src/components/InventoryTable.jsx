import { useState } from "react";
import { Download, Filter } from "lucide-react";
import {exportInventoryCSV} from "../utils/exportInventory";

export default function InventoryTable({ medicines }) {

  const [filterStatus, setFilterStatus] = useState("All");

  const handleExport = () => {
    exportInventoryCSV(medicines);
  };

  const filteredMedicines =
    filterStatus === "All"
      ? medicines
      : medicines.filter((m) => m.status === filterStatus);

  return (

    <div className="bg-white rounded-xl shadow-sm p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-semibold">
          Complete Inventory
        </h2>

        <div className="flex gap-2 items-center">

          {/* Filter */}
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">

            <Filter size={16}/>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="outline-none bg-transparent"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Expired">Expired</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm"
          >
            <Download size={16}/>
            Export
          </button>

        </div>

      </div>

      {/* Table */}
<div className="border border-gray-200 rounded-xl overflow-hidden">

  <table className="w-full text-sm">

    <thead className="bg-sky-50 text-gray-500 border-b border-gray-200">
      <tr>
        <th className="p-2 text-left">Medicine Name</th>
        <th className="p-2 text-left">Generic Name</th>
        <th className="p-2 text-left">Category</th>
        <th className="p-2 text-left">Batch No</th>
        <th className="p-2 text-left">Expiry Date</th>
        <th className="p-2 text-left">Quantity</th>
        <th className="p-2 text-left">Cost Price</th>
        <th className="p-2 text-left">MRP</th>
        <th className="p-2 text-left">Supplier</th>
        <th className="p-2 text-left">Status</th>
      </tr>
    </thead>

    <tbody>

      {filteredMedicines.map((m) => (

        <tr key={m.id} className="hover:bg-gray-50 border-b border-gray-100">

          <td className="p-2">{m.name}</td>
          <td className="p-2">{m.generic_name || "-"}</td>
          <td className="p-2">{m.category || "-"}</td>
          <td className="p-2">{m.batch_no || "-"}</td>
          <td className="p-2">{m.expiry_date}</td>

          <td className={`p-2 ${
            m.quantity < 10 ? "text-red-500 font-semibold" : ""
          }`}>
            {m.quantity}
          </td>

          <td className="p-2">₹{m.cost_price}</td>
          <td className="p-2">₹{m.price}</td>
          <td className="p-2">{m.manufacturer}</td>

          <td className="p-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              m.status === "Active" ? "bg-green-100 text-green-700" :
              m.status === "Low Stock" ? "bg-yellow-100 text-yellow-700" :
              m.status === "Expired" ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-700"
            }`}>
              {m.status}
            </span>
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    </div>

  );
}
import { useState } from "react";
import { Download, Filter } from "lucide-react";
import { exportInventoryCSV } from "../utils/exportInventory";

export default function InventoryTable({ medicines }) {

  const [filterStatus, setFilterStatus] = useState("All");

  const filteredMedicines =
    filterStatus === "All"
      ? medicines
      : medicines.filter((m) => m.status === filterStatus);

  const handleExport = () => {
    exportInventoryCSV(filteredMedicines);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">

        <h2 className="text-base sm:text-lg font-semibold">
          Complete Inventory
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

          {/* Filter */}
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm w-full sm:w-auto">
            <Filter size={16}/>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="outline-none bg-transparent w-full"
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
            className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg text-sm w-full sm:w-auto"
          >
            <Download size={16}/>
            Export
          </button>

        </div>

      </div>

    {/* Table Wrapper */}  
    <div className="border border-gray-200 rounded-xl overflow-x-auto">

      <table className="text-sm min-w-[1000px]">

        <thead className="bg-sky-50 text-gray-500 border-b border-gray-200">
          <tr>
            <th className="p-3 text-left">Medicine Name</th>
            <th className="p-3 text-left">Generic Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Batch No</th>
            <th className="p-3 text-left">Expiry Date</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Cost Price</th>
            <th className="p-3 text-left">MRP</th>
            <th className="p-3 text-left">Supplier</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredMedicines.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="p-3 whitespace-nowrap">{m.name}</td>
              <td className="p-3 whitespace-nowrap">{m.generic_name}</td>
              <td className="p-3 whitespace-nowrap">{m.category}</td>
              <td className="p-3 whitespace-nowrap">{m.batch_no}</td>
              <td className="p-3 whitespace-nowrap">
                {m.expiry_date
                  ? new Date(m.expiry_date).toLocaleDateString()
                  : "-"}
              </td>
              <td className="p-3 whitespace-nowrap">{m.quantity}</td>
              <td className="p-3 whitespace-nowrap">₹{m.cost_price}</td>
              <td className="p-3 whitespace-nowrap">₹{m.price}</td>
              <td className="p-3 whitespace-nowrap">{m.manufacturer}</td>
              <td className="p-3 whitespace-nowrap">{m.status}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>

    </div>
  );
}
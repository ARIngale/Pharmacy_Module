import { Package, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";

export default function InventoryOverview({ summary }) {

  return (

    <div className="bg-sky-50 shadow-sm rounded-xl p-4 sm:p-6">

      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Inventory Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        <Card
          label="Total Items"
          value={summary.total_items}
          icon={<Package />}
        />

        <Card
          label="Active Stock"
          value={summary.active_stock}
          icon={<CheckCircle />}
        />

        <Card
          label="Low Stock"
          value={summary.low_stock}
          icon={<AlertTriangle />}
        />

        <Card
          label="Total Value"
          value={`₹${summary.total_value}`}
          icon={<DollarSign />}
        />

      </div>

    </div>

  );

}

function Card({ label, value, icon }) {

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">

      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 truncate">{label}</p>
        <p className="text-lg sm:text-xl font-semibold truncate">{value}</p>
      </div>

      <div className="text-gray-400 shrink-0">
        {icon}
      </div>

    </div>
  );

}
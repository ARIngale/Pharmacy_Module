import { Package, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";

export default function InventoryOverview({ summary }) {

  return (

    <div className="bg-sky-50 shadow-sm rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        Inventory Overview
      </h2>

      <div className="grid grid-cols-4 gap-6">

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
    <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>

      <div className="text-gray-400">
        {icon}
      </div>

    </div>
  );

}
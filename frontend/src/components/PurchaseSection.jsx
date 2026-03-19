import { useState } from "react";
import { createPurchaseOrder } from "../api/api";

export default function PurchaseSection() {

  const [form, setForm] = useState({
    medicine_name: "",
    quantity: "",
    supplier: "",
    total_cost: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    try {

      await createPurchaseOrder({
        ...form,
        quantity: Number(form.quantity),
        total_cost: Number(form.total_cost)
      });

      setSuccess("Purchase order created successfully");
      setError("");

      setForm({
        medicine_name: "",
        quantity: "",
        supplier: "",
        total_cost: ""
      });

    } catch (err) {

      console.error(err);
      setError("Failed to create purchase order");
      setSuccess("");

    }

  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-6 flex flex-col gap-4">

      <h2 className="text-base sm:text-lg font-semibold">
        Create Purchase Order
      </h2>

      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

        <input
          name="medicine_name"
          placeholder="Medicine Name"
          value={form.medicine_name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="supplier"
          placeholder="Supplier"
          value={form.supplier}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          name="total_cost"
          type="number"
          placeholder="Total Cost"
          value={form.total_cost}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full sm:w-fit"
      >
        Create Purchase
      </button>

    </div>
  );
}
import { useState } from "react";
import { addMedicine } from "../api/api";

export default function AddMedicineModal({ open, onClose, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    generic_name: "",
    category: "",
    batch_no: "",
    manufacturer: "",
    cost_price: "",
    price: "",
    quantity: "",
    expiry_date: "",
    status: "Active"
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      const res = await addMedicine({
        ...form,
        cost_price: Number(form.cost_price),
        price: Number(form.price),
        quantity: Number(form.quantity)
      });

      const medicineName = res.data.name;

      setSuccessMsg(`Medicine "${medicineName}" added successfully`);
      setErrorMsg("");

      if (onSuccess) {
        onSuccess(res.data);
      }

      setForm({
        name: "",
        generic_name: "",
        category: "",
        batch_no: "",
        manufacturer: "",
        cost_price: "",
        price: "",
        quantity: "",
        expiry_date: "",
        status: "Active"
      });

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to add medicine");
      setSuccessMsg("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 p-3 sm:p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg p-4 sm:p-6 max-h-[90vh] flex flex-col">

        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Add Medicine
        </h2>

        {/* Success */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
            {successMsg}
          </div>
        )}

        {/* Error */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Form Scroll Area */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">

          <input name="name" placeholder="Medicine Name"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.name} />

          <input name="generic_name" placeholder="Generic Name"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.generic_name} />

          <input name="category" placeholder="Category"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.category} />

          <input name="batch_no" placeholder="Batch No"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.batch_no} />

          <input name="manufacturer" placeholder="Manufacturer"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.manufacturer} />

          <input name="cost_price" placeholder="Cost Price"
            type="number"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.cost_price} />

          <input name="price" placeholder="MRP (Selling Price)"
            type="number"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.price} />

          <input name="quantity" placeholder="Quantity"
            type="number"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.quantity} />

          <input name="expiry_date"
            type="date"
            className="border p-2 rounded w-full"
            onChange={handleChange} value={form.expiry_date} />

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded w-full sm:w-auto"
          >
            Close
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          >
            Add
          </button>

        </div>

      </div>
    </div>
  );
}
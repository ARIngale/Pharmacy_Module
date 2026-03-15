import { useState } from "react";
import { addMedicine } from "../api/api";

export default function AddMedicineModal({ open, onClose, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
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
        price: Number(form.price),
        quantity: Number(form.quantity)
      });

      const medicineName = res.data.name;

      setSuccessMsg(`Medicine "${medicineName}" added successfully`);
      setErrorMsg("");

      // send new medicine to parent component
      if (onSuccess) {
        onSuccess(res.data);
      }

      // reset form
      setForm({
        name: "",
        manufacturer: "",
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">

      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">

        <h2 className="text-lg font-semibold mb-4">
          Add Medicine
        </h2>

        {/* Success message */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
            {successMsg}
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-3">

          <input
            name="name"
            placeholder="Medicine Name"
            className="border p-2 rounded"
            onChange={handleChange}
            value={form.name}
          />

          <input
            name="manufacturer"
            placeholder="Manufacturer"
            className="border p-2 rounded"
            onChange={handleChange}
            value={form.manufacturer}
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            className="border p-2 rounded"
            onChange={handleChange}
            value={form.price}
          />

          <input
            name="quantity"
            placeholder="Quantity"
            type="number"
            className="border p-2 rounded"
            onChange={handleChange}
            value={form.quantity}
          />

          <input
            name="expiry_date"
            type="date"
            className="border p-2 rounded"
            onChange={handleChange}
            value={form.expiry_date}
          />

        </div>

        <div className="flex justify-end gap-2 mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Close
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>

        </div>

      </div>
    </div>
  );
}

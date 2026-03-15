import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getMedicines, createSale } from "../api/api";

export default function MakeSaleSection() {

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [patientId, setPatientId] = useState("");

  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [cart, setCart] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const res = await getMedicines();
        setMedicines(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMedicines();
  }, []);

  // Search medicines
  const handleSearch = (value) => {

    setSearch(value);

    if (!value) {
      setFilteredMedicines([]);
      return;
    }

    const results = medicines.filter((m) =>
      m.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMedicines(results);
    setShowDropdown(true);
  };

  // Add medicine to cart
  const addMedicine = (medicine) => {

    const exists = cart.find((item) => item.id === medicine.id);

    if (exists) return;

    setCart([
      ...cart,
      {
        ...medicine,
        quantity: 1
      }
    ]);

    setSearch("");
    setShowDropdown(false);
  };

  // Update quantity
  const updateQuantity = (id, value) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Number(value) }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Bill
  const handleBill = async () => {

    try {

      for (const item of cart) {

        await createSale({
          medicine_id: item.id,
          quantity_sold: item.quantity,
          patient_name: patientId,
          status: "Completed",
          total_price: totalBill
        });

      }

      setSuccess("Sale completed successfully");
      setError("");
      setCart([]);
      setPatientId("");

    } catch (err) {

      console.error(err);
      setError("Failed to complete sale");
      setSuccess("");

    }

  };

  const totalBill = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);


  return (
    <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 flex flex-col gap-5">

      {/* Title */}
      <div>
        <p className="text-lg text-gray-900">Make a Sale</p>
        <p className="text-gray-600">Select medicines from inventory</p>
      </div>

      {/* Messages */}
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

      {/* Inputs */}
      <div className="flex items-center gap-4 relative">

        {/* Patient ID */}
        <input
          type="text"
          placeholder="Patient Id"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="bg-white shadow-md px-4 py-1.5 rounded-lg outline-none w-[170px]"
        />

        {/* Search Medicine */}
        <div className="relative w-[280px]">

          <div className="flex items-center bg-white shadow-md px-3 py-1.5 rounded-lg">
            <Search size={16} className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          {/* Dropdown */}
          {showDropdown && filteredMedicines.length > 0 && (
            <div className="absolute top-9 left-0 w-full bg-white border rounded-lg shadow-lg z-10">

              {filteredMedicines.map((med) => (

                <div
                  key={med.id}
                  onClick={() => addMedicine(med)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {med.name}
                </div>

              ))}

            </div>
          )}

        </div>

        {/* Bill Button */}
      <button
        onClick={handleBill}
        disabled={cart.length === 0 || !patientId}
        className={`ml-auto px-9 py-1.5 rounded-lg text-white
        ${
          cart.length === 0 || !patientId
            ? "bg-orange-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        Bill
      </button>



      </div>

      {/* Cart Table */}
      <table className="w-full bg-white border border-gray-100 rounded-xl text-sm">

        {/* Header */}
        <thead className="text-gray-600 text-[12px] font-semibold bg-white">
          <tr>

            <th className="p-2 text-left">MEDICINE NAME</th>
            <th className="p-2 text-left">GENERIC NAME</th>
            <th className="p-2 text-left">BATCH NO</th>
            <th className="p-2 text-left">EXPIRY DATE</th>
            <th className="p-2 text-left">QUANTITY</th>
            <th className="p-2 text-left">MRP / PRICE</th>
            <th className="p-2 text-left">SUPPLIER</th>
            <th className="p-2 text-left">STATUS</th>
            <th className="p-2 text-left">ACTIONS</th>

          </tr>
        </thead>


        {/* Body */}
        <tbody>

          {cart.map((item) => (

            <tr key={item.id} className="">

              <td className="p-2">{item.name}</td>

              <td className="p-2">{item.generic_name || "-"}</td>

              <td className="p-2">{item.batch_no || "-"}</td>

              <td className="p-2">{item.expiry_date}</td>

              <td className="p-2">

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, e.target.value)
                  }
                  className="w-16 border rounded px-2 py-1"
                />

              </td>

              <td className="p-2">₹{item.price}</td>

              <td className="p-2">{item.manufacturer}</td>

              <td className="p-2">

                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  {item.status}
                </span>

              </td>

              <td className="p-2">

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>



<div className="flex justify-end items-center gap-4 mt-4">

  <span className="text-lg font-semibold text-gray-700">
    Total: ₹{totalBill}
  </span>

</div>

    </div>
  );
}

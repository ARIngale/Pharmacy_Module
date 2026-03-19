import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getMedicines, createSale } from "../api/api";

export default function MakeSaleSection() {

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [patientId, setPatientId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

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

  const handleSearch = (value) => {
    setSearch(value);

    if (!value) {
      setFilteredMedicines([]);
      setShowDropdown(false);
      return;
    }

    const results = medicines.filter((m) =>
      m.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMedicines(results);
    setShowDropdown(true);
  };

  const addMedicine = (medicine) => {
    const exists = cart.find((item) => item.id === medicine.id);
    if (exists) return;

    setCart([
      ...cart,
      { ...medicine, quantity: 1 }
    ]);

    setSearch("");
    setShowDropdown(false);
  };

  const updateQuantity = (id, value) => {
    const qty = Math.max(1, Number(value));

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBill = async () => {

    if (cart.length === 0) {
      setError("Cart is empty");
      return;
    }

    if (!patientId) {
      setError("Enter patient name");
      return;
    }

    try {

      await createSale({
        patient_name: patientId,
        payment_method: paymentMethod,
        items: cart.map(item => ({
          medicine_id: item.id,
          quantity: Number(item.quantity)
        }))
      });

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

  return (
    <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 sm:p-6 flex flex-col gap-5">

      {/* Title */}
      <div>
        <p className="text-base sm:text-lg text-gray-900">Make a Sale</p>
        <p className="text-sm text-gray-600">Select medicines from inventory</p>
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
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center relative">

        {/* Patient */}
        <input
          type="text"
          placeholder="Patient Name"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="bg-white shadow-md px-4 py-2 rounded-lg outline-none w-full lg:w-[170px]"
        />

        {/* Search */}
        <div className="relative w-full lg:w-[280px]">

          <div className="flex items-center bg-white shadow-md px-3 py-2 rounded-lg">
            <Search size={16} className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="outline-none w-full"
            />
          </div>

          {showDropdown && filteredMedicines.length > 0 && (
            <div className="absolute top-10 left-0 w-full bg-white border rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">

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

        {/* Payment */}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full lg:w-auto"
        >
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
        </select>

        {/* Bill */}
        <button
          onClick={handleBill}
          disabled={cart.length === 0 || !patientId}
          className={`px-6 py-2 rounded-lg text-white w-full lg:w-auto lg:ml-auto
          ${
            cart.length === 0 || !patientId
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Bill
        </button>

      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full bg-white border border-gray-100 rounded-xl text-sm">

          <thead className="text-gray-600 text-[12px] font-semibold">
            <tr>
              <th className="p-2 text-left">MEDICINE</th>
              <th className="p-2">GENERIC</th>
              <th className="p-2">BATCH</th>
              <th className="p-2">EXPIRY</th>
              <th className="p-2">QTY</th>
              <th className="p-2">PRICE</th>
              <th className="p-2">SUPPLIER</th>
              <th className="p-2">STATUS</th>
              <th className="p-2">ACTION</th>
            </tr>
          </thead>

          <tbody>

            {cart.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-2 whitespace-nowrap">{item.name}</td>
                <td className="p-2 whitespace-nowrap">{item.generic_name || "-"}</td>
                <td className="p-2 whitespace-nowrap">{item.batch_no || "-"}</td>

                <td className="p-2 whitespace-nowrap">
                  {item.expiry_date
                    ? new Date(item.expiry_date).toLocaleDateString()
                    : "-"}
                </td>

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

                <td className="p-2 whitespace-nowrap">₹{item.price}</td>
                <td className="p-2 whitespace-nowrap">{item.manufacturer}</td>

                <td className="p-2 whitespace-nowrap">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    {item.status}
                  </span>
                </td>

                <td className="p-2 whitespace-nowrap">
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
      </div>

      {/* Total */}
      <div className="flex justify-end mt-4">
        <span className="text-base sm:text-lg font-semibold">
          Total: ₹{totalBill}
        </span>
      </div>

    </div>
  );
}
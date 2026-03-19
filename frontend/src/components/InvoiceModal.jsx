export default function InvoiceModal({ sale, onClose }) {

  if (!sale) return null;

  const year = new Date(sale.sale_date).getFullYear();
  const invoiceId = `INV-${sale.id}-${year}`;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-3 sm:p-4">

      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Invoice
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 mb-4 break-all">
          {invoiceId}
        </p>

        <div className="mb-4 text-xs sm:text-sm space-y-1">
          <p><b>Patient:</b> {sale.patient_name}</p>
          <p><b>Payment:</b> {sale.payment_method}</p>
          <p><b>Date:</b> {new Date(sale.sale_date).toLocaleDateString()}</p>
        </div>

        {/* Table Wrapper */}
        <div className="border rounded-lg overflow-x-auto">
          <table className="min-w-[500px] w-full text-xs sm:text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Medicine</th>
                <th className="p-2 text-center">Expiry</th>
                <th className="p-2 text-center">Qty</th>
                <th className="p-2 text-center">Price</th>
                <th className="p-2 text-center">Total</th>
              </tr>
            </thead>

            <tbody>

              {sale.items.map((item, index) => (

                <tr key={index} className="border-t text-center">

                  <td className="p-2 text-left font-medium whitespace-nowrap">
                    {item.medicine_name}
                  </td>

                  <td className="p-2 whitespace-nowrap">
                    {item.expiry_date
                      ? new Date(item.expiry_date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-2 whitespace-nowrap">{item.quantity}</td>

                  <td className="p-2 whitespace-nowrap">₹{item.price}</td>

                  <td className="p-2 font-medium whitespace-nowrap">
                    ₹{item.quantity * item.price}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

        {/* Total */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">

          <p className="text-xs sm:text-sm text-gray-500">
            Total Items: {sale.items.length}
          </p>

          <p className="font-semibold text-base sm:text-lg">
            Total: ₹{sale.total_price}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">

          <button
            onClick={() => window.print()}
            className="px-4 py-2 border rounded hover:bg-gray-100 w-full sm:w-auto"
          >
            Print
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
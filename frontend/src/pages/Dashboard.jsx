import { useEffect, useState } from "react";
import { getRecentSales } from "../api/api";
import MakeSaleSection from "../components/MakeSaleSection";
import PurchaseSection from "../components/PurchaseSection";
import InvoiceModal from "../components/InvoiceModal";
import { ShoppingCart } from "lucide-react";

export default function Dashboard({ showSaleSection, showPurchase }) {

  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    async function fetchRecentSales() {
      try {
        const res = await getRecentSales();
        setRecentSales(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load recent sales");
      } finally {
        setLoading(false);
      }
    }

    fetchRecentSales();
  }, []);

  if (loading) return <div className="text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">

      {/* Sections */}
      {showSaleSection && <MakeSaleSection />}
      {showPurchase && !showSaleSection && <PurchaseSection />}

      {/* Recent Sales */}
      <div className="p-4 sm:p-6">

        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Recent Sales
        </h2>

        {recentSales.length === 0 ? (

          <p className="text-gray-500">
            No recent sales found
          </p>

        ) : (

          <div className="flex flex-col gap-3">

            {recentSales.map((sale) => (

              <div
                key={sale.id}
                onClick={() => setSelectedSale(sale)}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition"
              >

                {/* Left */}
                <div className="flex items-center gap-3 sm:gap-4">

                  <div className="bg-gradient-to-r from-green-500 to-orange-500 p-2 sm:p-3 rounded-xl shrink-0">
                    <ShoppingCart className="text-white" size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      INV-{sale.id}-{new Date(sale.sale_date).getFullYear()}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {sale.patient_name || "Customer"} • {sale.quantity_sold} items
                    </p>
                  </div>

                </div>

                {/* Right */}
                <div className="flex flex-row sm:flex-row items-center justify-between sm:justify-end gap-3">

                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      ₹{sale.total_price}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {sale.sale_date
                        ? new Date(sale.sale_date).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded whitespace-nowrap">
                    {sale.status || "Completed"}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        sale={selectedSale}
        onClose={() => setSelectedSale(null)}
      />

    </div>
  );
}
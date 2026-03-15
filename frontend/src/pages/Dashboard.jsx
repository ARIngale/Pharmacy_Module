import { useEffect, useState } from "react";
import { getRecentSales } from "../api/api";
import MakeSaleSection from "../components/MakeSaleSection";
import { ShoppingCart } from "lucide-react";
import PurchaseSection from "../components/PurchaseSection";


export default function Dashboard({ showSaleSection, showPurchase }) {

  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchRecentSales() {



      try {
        const res = await getRecentSales();
            const apiSales = res.data.data || [];



        setRecentSales(res.data.data);
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
    <div>

       {showSaleSection && <MakeSaleSection />}
       {showPurchase &&!showSaleSection && <PurchaseSection />}


        <div className="p-6">

      <h2 className="text-lg font-semibold mb-4">
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
    className="flex items-center justify-between border border-gray-200 rounded-xl p-4 mb-3"
  >

    {/* Left Section */}
    <div className="flex items-center gap-4">

      {/* Icon */}
      <div className="bg-green-500 p-3 rounded-xl">
        <ShoppingCart className="text-white" size={18} />
      </div>

      {/* Sale Info */}
      <div>
        <p className="font-semibold text-gray-800">
          INV-{sale.id}
        </p>

        <p className="text-sm text-gray-500">
          Customer {sale.customer_id} • {sale.quantity_sold} items • Card
        </p>
      </div>

    </div>


    {/* Right Section */}
    <div className="text-right flex flex-row justify-center gap-2 align-middle">

      <div><p className="font-semibold text-gray-800">
        ₹{sale.total_price}
      </p>

      <p className="text-sm text-gray-500">
        {new Date(sale.sale_date).toISOString().split("T")[0]}
      </p>
      </div>
          <span className="bg-green-100 text-green-700 text-sm w-fit h-fit">
      Completed
    </span>

    </div>




  </div>

))}

        </div>

      )}

      </div>

    </div>
  );
}
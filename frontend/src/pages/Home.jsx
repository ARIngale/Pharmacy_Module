import { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Truck,
  Download,
  Plus,
  TrendingUp
} from "lucide-react";

import StatCard from "../components/StatCard";
import Tabs from "../components/Tabs";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import AddMedicineModal from "../components/AddMedicineModal";
import { exportInventoryCSV } from "../utils/exportInventory";
import { getMedicines } from "../api/api";

import {
  getTodaySalesAmount,
  getTodaySalesCount,
  getLowStockCount,
  getPurchaseOrdersCount
} from "../api/api";

export default function Home() {

  const [todaySalesAmount, setTodaySalesAmount] = useState(0);
  const [todaySalesCount, setTodaySalesCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [purchaseOrdersCount, setPurchaseOrdersCount] = useState(0);
  const [activeTab, setActiveTab] = useState("sales");
  const [openAddMedicine, setOpenAddMedicine] = useState(false);
  const [showSaleSection, setShowSaleSection] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchDashboardData() {

      try {

        const [
          salesAmountRes,
          salesCountRes,
          lowStockRes,
          purchaseRes
        ] = await Promise.all([
          getTodaySalesAmount(),
          getTodaySalesCount(),
          getLowStockCount(),
          getPurchaseOrdersCount()
        ]);

        setTodaySalesAmount(salesAmountRes.data.data.today_sales_amount);
        setTodaySalesCount(salesCountRes.data.data.today_sales_count);
        setLowStockCount(lowStockRes.data.data.low_stock_count);
        setPurchaseOrdersCount(purchaseRes.data.data.total_orders);

      } catch (err) {

        console.error(err);
        setError("Failed to load dashboard data");

      } finally {

        setLoading(false);

      }

    }

    fetchDashboardData();

  }, []);

  const handleExport = async () => {

  try {

    const res = await getMedicines();

    exportInventoryCSV(res.data);

  } catch (err) {

    console.error(err);
    alert("Failed to export inventory");

  }

};


  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-6 bg-white rounded-xl shadow-sm p-6">

      {/* Title */}
      <div className="flex flex-row justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold">
            Pharmacy CRM
          </h1>

          <p className="text-gray-600 text-sm">
            Manage inventory, sales, and purchase orders
          </p>
        </div>

        <div className="flex gap-2">

          <button
              onClick={handleExport}
              className="flex items-center gap-2 border-2 border-blue-500 rounded-xl text-blue-500 px-4 py-2"
            >
              <Download size={16} /> Export
            </button>


         <button
            onClick={() => setOpenAddMedicine(true)}
            className="flex items-center gap-2 rounded-xl text-white bg-blue-500 px-4 py-2"
          >
            <Plus size={16} /> Add Medicine
          </button>


        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">

        <StatCard
          label="Today's Sales"
          value={`₹${todaySalesAmount}`}
          icon={DollarSign}
          badgeIcon={TrendingUp}
          growth="+12.5%"
          iconBg="bg-green-500"
          badgeBg="bg-green-100"
          badgeText="text-green-600"
        />

        <StatCard
          label="Sales Transactions"
          value={todaySalesCount}
          icon={ShoppingCart}
          growth="32 orders"
          iconBg="bg-blue-600"
          badgeBg="bg-blue-100"
          badgeText="text-sky-800"
        />

        <StatCard
          label="Low Stock"
          value={lowStockCount}
          icon={AlertTriangle}
          growth="Action Needed"
          iconBg="bg-orange-500"
          badgeBg="bg-orange-100"
          badgeText="text-orange-700"
        />

        <StatCard
          label="Purchase Orders"
          value={`₹${purchaseOrdersCount}`}
          icon={Truck}
          growth="5 pending"
          iconBg="bg-sky-800"
          badgeBg="bg-sky-100"
          badgeText="text-blue-600"
        />

      </div>

    <div className="bg-white round-2xl shadow-xl p-5">
      <div className="flex justify-between items-center mb-5">

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="flex gap-2">

        <button
          onClick={() => setShowSaleSection(prev => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
          ${activeTab === "sales"
              ? "bg-gradient-to-r from-sky-600 to-blue-500 text-white"
              : "bg-white border text-gray-700"
          }`}
        >
          <Plus size={16} />
          New Sale
        </button>


       <button
          onClick={() => setShowPurchase(!showPurchase)}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm bg-white"
        >
          <Plus size={16} />
          New Purchase
        </button>



        </div>

      </div>

  


        <div className="flex flex-col gap-6">


            {/* Tab Content */}
            {activeTab === "sales" && (
              <Dashboard showSaleSection={showSaleSection} showPurchase={showPurchase} />
            )}


            {activeTab === "purchase" && <div>Purchaces list will be here</div>}

            {activeTab === "inventory" && <Inventory />}

        </div>

    </div>
    <AddMedicineModal
  open={openAddMedicine}
  onClose={() => setOpenAddMedicine(false)}
  onSuccess={() => window.location.reload()}
/>



    </div>

    
  );
}
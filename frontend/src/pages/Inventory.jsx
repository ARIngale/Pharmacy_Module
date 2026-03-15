import { useEffect, useState } from "react";
import InventoryOverview from "../components/InventoryOverview";
import InventoryTable from "../components/InventoryTable";
import { getMedicines, getInventorySummary } from "../api/api";

export default function Inventory() {

  const [medicines, setMedicines] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchInventory() {

      try {

        const [medRes, sumRes] = await Promise.all([
          getMedicines(),
          getInventorySummary()
        ]);

        setMedicines(medRes.data);
        setSummary(sumRes.data.data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    fetchInventory();

  }, []);

  if (loading) return <div>Loading inventory...</div>;
        console.log(summary)


  return (
    <div className="flex flex-col gap-6">

      <InventoryOverview summary={summary} />


      <InventoryTable medicines={medicines} />

    </div>
  );
}
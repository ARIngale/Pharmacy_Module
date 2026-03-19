import { ShoppingCart, Package, FileText } from "lucide-react";

export default function Tabs({ activeTab, setActiveTab }) {

  const tabs = [
    { name: "sales", label: "Sales", icon: ShoppingCart },
    { name: "purchase", label: "Purchase", icon: Package },
    { name: "inventory", label: "Inventory", icon: FileText },
  ];

  return (
    <div className="w-full overflow-x-auto">

      <div className="flex gap-2 bg-gray-100 rounded-xl p-1 w-max">

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition
                ${active ? "bg-white shadow-sm text-black" : "text-gray-600"}
              `}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}

      </div>

    </div>
  );
}
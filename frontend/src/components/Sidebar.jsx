import { NavLink } from "react-router-dom";
import {
  Search,
  PanelLeft,
  TextAlignJustify,
  Activity,
  Calendar,
  Users,
  Stethoscope,
  Pill,
  Plus,
  Sparkles,
  Settings
} from "lucide-react";

const menuItems = [
  { icon: Search, path: "/" },
  { icon: PanelLeft, path: "/" },
  { icon: TextAlignJustify, path: "/" },
  { icon: Activity, path: "/" },
  { icon: Calendar, path: "/" },
  { icon: Users, path: "/" },
  { icon: Stethoscope, path: "/" },
  { icon: Pill, path: "/" },
  { icon: Plus, path: "/" },
  { icon: Sparkles, path: "/" },
];

export default function Sidebar() {
  return (
    <div className="w-20 bg-gray-100 shadow-lg flex flex-col items-center py-6 rounded-[3vw]">

      {/* Top menu icons */}
      <div className="flex flex-col gap-4">

        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isPlus = item.icon === Plus;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={`p-3 transition 
                ${isPlus
                  ? "bg-white rounded-full shadow-sm"
                  : "hover:bg-white hover:rounded-full"}
              `}
            >
              <Icon size={15} />
            </NavLink>
          );
        })}

      </div>

      {/* Spacer */}
      <div className="flex-1 flex items-center justify-center">

        {/* Settings icon */}
        <div className="p-3 hover:bg-white hover:rounded-full transition">
          <Settings size={15} />
        </div>

      </div>

    </div>
  );
}
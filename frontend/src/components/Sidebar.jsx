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
    <div
      className="
        bg-gray-100 shadow-xl flex 
        md:flex-col md:items-center 
        justify-around md:justify-start
        h-full md:h-screen w-full md:w-20
        rounded-none md:rounded-[1vw]
        px-2 md:px-0 py-2 md:py-4
      "
    >

      {/* Menu Icons */}
      <div className="
        flex 
        flex-row md:flex-col 
        gap-2 md:gap-4 
        items-center justify-around md:justify-start 
        w-full
      ">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isPlus = item.icon === Plus;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={`p-2 md:p-3 transition 
                ${isPlus
                  ? "bg-white rounded-full shadow-sm"
                  : "hover:bg-white hover:rounded-full"}
              `}
            >
              <Icon size={18} />
            </NavLink>
          );
        })}
      </div>

      {/* Settings (hidden on mobile for space) */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <div className="p-3 hover:bg-white hover:rounded-full transition">
          <Settings size={18} />
        </div>
      </div>

    </div>
  );
}
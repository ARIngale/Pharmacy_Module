import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="
        fixed 
        bottom-0 left-0 w-full h-16 
        md:top-0 md:left-0 md:h-screen md:w-20 
        z-50
      ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full p-4 sm:p-6 md:pl-24 overflow-x-auto">
  <div className="min-w-0">
    {children}
  </div>
</div>

    </div>
  );
}
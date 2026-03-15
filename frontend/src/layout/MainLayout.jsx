import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 pl-24">
      <div className="fixed left-0 top-0 p-4">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
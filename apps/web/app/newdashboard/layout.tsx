import Navbar from "@/components/new custom/Navbar";
import Sidebar from "@/components/new custom/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex mx-auto">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="">{children}</div>
      </div>
    </div>
  );
}

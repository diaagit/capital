// import Navbar from "@/components/new custom/Navbar";
import Sidebar from "@/components/new custom/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto flex h-screen gap-6 p-6 overflow-hidden">
      <aside className="sticky top-0 h-screen">
        <Sidebar />
      </aside>

      <main className="flex-1 min-h-screen overflow-y-auto bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.05)] p-6 no-scrollbar">
        {children}
      </main>
    </div>
  );
}

// import Navbar from "@/components/new custom/Navbar";
// import Sidebar from "@/components/new custom/Sidebar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="max-w-7xl flex mx-auto">
//       <Sidebar />
//       <div className="w-full">
//         <Navbar />
//         <div className="">{children}</div>
//       </div>
//     </div>
//   );
// }

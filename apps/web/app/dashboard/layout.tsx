// import Navbar from "@/components/new custom/Navbar";
import Sidebar from "@/components/new custom/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-muted/40">
      <div className="max-w-7xl mx-auto flex h-full gap-6 p-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 h-full">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 h-full overflow-y-auto rounded-2xl bg-white shadow-sm ">
          {children}
        </main>
      </div>
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

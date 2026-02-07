import VerifierSideNav from "@/components/new custom/VerifierSideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden grid grid-cols-[16rem_1fr] bg-muted/40 no-scrollbar">
      <aside className="border-r bg-background flex flex-col">
        <VerifierSideNav />
      </aside>
      <div className="flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 no-scrollbar">
          {children}
        </main>

      </div>
    </div>
  );
}
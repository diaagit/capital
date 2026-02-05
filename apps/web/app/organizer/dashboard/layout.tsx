import Navbar from "@/components/new custom/Navbar";
import VerifierSideNav from "@/components/new custom/VerifierSideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex mx-auto">
      <VerifierSideNav />
      <div className="w-full">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}
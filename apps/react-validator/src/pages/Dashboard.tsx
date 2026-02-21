import VerifierSideNav from "@/components/new_custom/ValidatorSidebar";
import type { ReactNode } from "react";

interface DashboardPageProps {
  children: ReactNode;
}

const DashboardPage = ({ children }: DashboardPageProps) => {
  return (
    <div className="h-screen flex bg-white">
      
      <div className="w-64 border-r flex-shrink-0">
        <VerifierSideNav />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </div>

    </div>
  );
};

export default DashboardPage;
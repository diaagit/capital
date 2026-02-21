import {
  LayoutDashboard,
  Tickets,
  ReceiptIndianRupee,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function VerifierSideNav() {
  const pathname = usePathname();
  const router = useNavigate();
  const linkBase =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

  const linkInactive =
    "text-muted-foreground hover:text-foreground hover:bg-muted";

  const linkActive =
    "bg-muted text-foreground";

  const link = (href: string) =>
    `${linkBase} ${
      pathname === href ? linkActive : linkInactive
    }`;

  const removeToken = async () => {
        try {
            const URL = getBackendUrl();
            const token = localStorage.getItem("token");
            if(!token){
                toast.warning("You are not logged in")
                router("/signin");
            }
            router("/signin");
            
            const res = await axios.get(`${URL}/verifier/logout`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 200){
                localStorage.removeItem("token");
            }
        } catch (error) {
            toast.error("Error logging out")
        }
    }

  return (
    <aside className="flex h-full w-full flex-col bg-background">

      <div className="h-16 flex items-center px-6 border-b">
        <a href="/dashboard" className="flex items-center gap-2">
          <img
            src="/forget-password/Capital-White.svg"
            alt="Capital"
            width={26}
            height={26}
            className="invert"
          />
          <span className="text-base font-semibold tracking-tight">
            Capital
          </span>
        </a>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">

        <a href="/dashboard" className={link("/dashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </a>

        <a href="/dashboard/events" className={link("/dashboard/events")}>
          <Tickets size={18} />
          Events
        </a>

        <a href="/dashboard/wallet" className={link("/dashboard/wallet")}>
          <Wallet size={18} />
          Wallet
        </a>

        <a href="/dashboard/profile" className={link("/dashboard/profile")}>
          <ReceiptIndianRupee size={18} />
          Invoices
        </a>

        <Separator className="my-4" />

        <a href="/newdashboard/settings" className={link("/newdashboard/settings")}>
          <Settings size={18} />
          Profile
        </a>

        <Button onClick={removeToken} variant="ghost" className={`${linkBase} w-full flex justify-start items-center p-3 text-red-500 rounded-sm hover:bg-red-50`}>
          <LogOut size={18} />
          Logout
        </Button>
      </nav>
    </aside>
  );
}
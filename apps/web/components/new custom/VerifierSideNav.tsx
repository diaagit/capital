"use client";

import {
  LayoutDashboard,
  Tickets,
  SquareCheckBig,
  ReceiptIndianRupee,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import { Button } from "../ui/button";

export default function VerifierSideNav() {
  const pathname = usePathname();
  const router = useRouter();
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
                router.push("/organizer/login");
            }
            router.push("/organizer/login");
            
            const res = await axios.get(`${URL}/organiser/logout`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 200){
                localStorage.removeItem("token");
            }
        } catch (error) {
            toast.error("Error took place ",error)
        }
    }

  return (
    <aside className="flex h-full w-full flex-col bg-background">

      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src="/assets/forget-password/Capital-White.svg"
            alt="Capital"
            width={26}
            height={26}
            className="invert"
          />
          <span className="text-base font-semibold tracking-tight">
            Capital
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">

        <Link href="/organizer/dashboard" className={link("/organizer/dashboard")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link href="/organizer/dashboard/events" className={link("/organizer/dashboard/events")}>
          <Tickets size={18} />
          Events
        </Link>

        <Link href="/organizer/dashboard/wallet" className={link("/organizer/dashboard/wallet")}>
          <Wallet size={18} />
          Wallet
        </Link>

        <Link href="/organizer/dashboard/profile" className={link("/organizer/dashboard/profile")}>
          <ReceiptIndianRupee size={18} />
          Invoices
        </Link>

        <Separator className="my-4" />

        <Link href="/newdashboard/settings" className={link("/newdashboard/settings")}>
          <Settings size={18} />
          Settings
        </Link>

        <Button onClick={removeToken} variant="ghost" className={`${linkBase} w-full flex justify-start items-center p-3 text-red-500 rounded-sm hover:bg-red-50`}>
          <LogOut size={18} />
          Logout
        </Button>
      </nav>
    </aside>
  );
}
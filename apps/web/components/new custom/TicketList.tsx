"use client"
import { ChevronRight, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import getBackendUrl from "@/lib/config";
import axios from "axios";

// {
//     "id": "f285c230-9dc1-4a38-a696-58539b2a1b51",
//     "eventSlotId": "cbee3cc5-5e95-413f-bd46-4bafa7ef7836",
//     "userId": "e9daf0b5-52c7-4cdd-a8cb-f078396a046b",
//     "qr_code_data": "https://xntcmbrnuyvzjeupfbyt.supabase.co/storage/v1/object/public/uploads/tickets/e9daf0b5-52c7-4cdd-a8cb-f078396a046b-1769625005375.png",
//     "signature": "{\"ciphertext\":\"hxKQdFbm0fRQTjgdLQojy94bZTRDdLefOkgqrDLfBrNrhMsgBRbM2LYav8U4goivcsuwp5dnxvrBzAaJlycGUlqNIGWAFA8f8gknePpK-5Q3f3Ca70pQhtco8VecRYmbYyyVYcNL0-xzgUeNtEfMBCNYi4IX6SdInBr9OWpOevA_QIwrxQ2Ig_99Cz3-cDD7reIHBBDdljNEZL5tXvGsJSa8hvc-DO4xtfSpcj_FiLmnpfp5i2TlqLWZ0cbhMW0ngBxSY4fYdibfAtN-849-frJ2j7YBS71_nRfSnfoVbiZLBG89mbAv_QAW5W81jVCTxWH81N97SQ9hRICkD9C5zdLTkSGp6bmg0sa5zf_r-t4RB6M_nmWtJ7I18NLtqEi_t7lP-7FRkLl2G7ZFxyXvxM1bt792n08u3RD40ExnJ4FffUbPmeCASqDbtKWJ3g_PWrnHbY3X9ZicbZp3288eQMtM2ngq2YH-UEWg4O4h1qPf4AtaS39V0S9pf4Nvktb53-7LZeEdDJBG_xNr6eRaCIr4VEXZ2uuxcNVDRtewCfTY4g2rwRCwYbjO5jME6EFIoa73SMd4HcofOfHlRfUbBd5Wn5gj_tl3DJzbxPasVyI7l6SfM4Qjjsn-sEPWTLx9llHsMR8lf9saUMpMWF1Ag1mDmTZElUy-I180QhoF7LJFlEoNdnZK3SNTsy-lnOPDBswMuVhrM8KYe_hpCdyjlch0hF8VYxhW7rL3erNDULZdCjFVxKQK1P0sXcFglxJItpPsvPCW5QHKeHOZXaCyFfCaHEMjTV6kwJ7Zohi_LIwcX3hr6A\",\"nonce\":\"GhZjnnCnvpMtinBRckv9jdrMfFfFkcFQ\"}",
//     "status": "ISSUED",
//     "issued_at": "2026-01-28T18:30:05.055Z",
//     "is_valid": true,
//     "is_verified": false,
//     "scanned_at": null,
//     "scannedById": null
// }

interface TicketInterface {
  id: string,
  eventSlotId: string,
  userId: string,
  qr_code_data: string,
  signature:string,
  status:string,
  issued_at: string,
  is_valid: boolean,
  is_verified: boolean,
  scanned_at: any,
  scannedById: string | null
}

interface MetaInterface {
  issued: string ;
  cancelled: string;
  used: string;
  expired: string;
  total: string;
}

interface BackendProps {
  message: string;
  ticketRecords: TicketInterface[];
  meta: MetaInterface;
}

const ticketData = [
  { id: "R123", name: "Adele Concert", date: "Tue 30 Sep", time: "7:30 PM", totalPaid: "$200", tickets: 2, status: "Completed" },
  { id: "R124", name: "Adele Concert", date: "Tue 30 Sep", time: "7:30 PM", totalPaid: "$200", tickets: 2, status: "Pending" },
  { id: "R125", name: "Adele Concert", date: "Tue 30 Sep", time: "7:30 PM", totalPaid: "$200", tickets: 2, status: "Cancelled" },
];

const statusClasses: Record<string, string> = {
  Completed: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
};

const TicketList = () => {
  const router = useRouter();
  const [data,setData] = useState();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      toast.warning("You are not logged in");
      router.push("/login");
    }
    const URL = getBackendUrl();
    async function getData() {
      const res = await axios.get(`${URL}/tickets/my`,{headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
      const data = res.data.ticketRecords;
      setData(data);
    }
    getData();
  },[])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default" size="sm">
          All (7)
        </Button>
        <Button variant="outline" size="sm">
          Pending (1)
        </Button>
        <Button variant="outline" size="sm">
          Cancelled (2)
        </Button>
        <Button variant="outline" size="sm">
          Completed (4)
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {ticketData.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Ticket className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ticket.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      # {ticket.id}
                    </p>
                  </div>
                </div>

                <Badge className={statusClasses[ticket.status]}>
                  {ticket.status}
                </Badge>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
                <div>
                  <p className="text-muted-foreground">Order Date:</p>
                  <p className="font-medium">
                    {ticket.date} • {ticket.time}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Total Paid:</p>
                  <p className="font-medium">{ticket.totalPaid}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Tickets:</p>
                  <p className="font-medium">{ticket.tickets} tickets</p>
                </div>

                <div className="flex items-end justify-end">
                  <Link href={`/tickets/${ticket.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Ticket Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
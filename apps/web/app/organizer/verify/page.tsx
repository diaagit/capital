"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CircleArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
}

export default function Page() {
  const router = useRouter();
  const [otp, setOtp] = React.useState("");

  async function handleOtp() {
    try {
        if (otp.length !== 6) {
            alert("Please enter the full OTP");
            return;
        }
        const URL = getBackendUrl();
        const token = localStorage.getItem("token");
        const response = await axios.post(`${URL}/organiser/verify`,
        {
            otp: otp
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status === 200){
            //localStorage.removeItem("token");
            localStorage.setItem("token", response.data.token);
            toast.success("You are successfully verified with our services");
            router.push("/organizer/dashboard");
        }
    } catch (error) {
        console.log(error)
        toast.error("Error took place:",error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4">
      <div className="w-full max-w-[680px] h-[520px] rounded-2xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">
        
        <div className="h-16 flex items-center justify-between px-6 border-b bg-white/70">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/forget-password/Capital.png"
              alt="Capital Icon"
              width={22}
              height={22}
            />
            <h1 className="text-lg font-semibold tracking-tight text-gray-900">
              Capital
            </h1>
          </div>

          <p className="text-sm text-gray-600">
            Have an account?{" "}
            <Link
              href="/organizer/login"
              className="text-indigo-600 font-medium hover:text-indigo-700 transition"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)] px-10 text-center gap-5">
          <Image
            src="/assets/forget-password/ResetPassword.png"
            alt="OTP Verification"
            width={130}
            height={130}
            className="drop-shadow-md"
          />

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              OTP Verification
            </h1>
            <p className="text-sm text-gray-500 max-w-md">
              Enter the 6-digit code sent to your registered email address.
            </p>
          </div>

          <div className="mt-2">
            <InputOTP maxLength={6} value={otp} onChange={(value)=>{setOtp(value)}}>
              <InputOTPGroup className="gap-2">
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-12 rounded-lg border border-gray-300 text-lg font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
                  />
                ))}
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup className="gap-2">
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-12 rounded-lg border border-gray-300 text-lg font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full max-w-sm h-12 mt-4 rounded-xl bg-black text-white text-base font-medium hover:bg-gray-900 active:scale-[0.98] transition-all"
            disabled={otp.length !== 6}
            onClick={handleOtp}
          >
            Verify OTP
          </Button>

          <Link
            href="/organizer/login"
            className="mt-3 text-sm text-gray-600 hover:text-indigo-600 flex items-center gap-1 transition"
          >
            <CircleArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
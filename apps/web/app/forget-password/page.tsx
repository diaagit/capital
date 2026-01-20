"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { CircleArrowLeft } from "lucide-react";
import StepPassword from "@/components/new custom/ResetP_StepPassword";
import StepOtp from "@/components/new custom/ResetP_StepOtp";
import StepEmail from "@/components/new custom/ResetP_StepEmail";
import StepIndicator from "@/components/new custom/ResetP_StepIndicator";
import { useRouter } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL
if(!URL){
  throw new Error("No backend URL was provided");
}

export type Step = 1 | 2 | 3;

export default function Page() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>(1);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendOtp = async () => {
    const response = await axios.post(`${URL}/user/otp`, { email });
    if(response.status === 200){
        setStep(2);
    }else{
        setStep(1);
    }
  };

  const verifyOtp = async () => {
    setStep(3);
  };

  const resetPassword = async () => {
    const response = await axios.post(`${URL}/user//reset-password`, { email, otp, password });
    if(response.status === 200){
        router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="w-full max-w-[700px] rounded-xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border border-white/40">
        
        <div className="w-full h-16 flex justify-between items-center px-6 border-b bg-white/60">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/forget-password/Capital.png"
              alt="Capital Icon"
              width={20}
              height={20}
            />
            <h1 className="text-lg font-semibold">Capital</h1>
          </div>

          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center text-center px-10 py-10 gap-6">
          <Image
            src="/assets/forget-password/forgetPassword.png"
            alt="Forget Password"
            width={120}
            height={120}
          />

          <h1 className="text-2xl font-bold text-gray-800">
            Reset your password
          </h1>

          <p className="text-sm text-gray-500 max-w-md">
            Follow the steps below to securely reset your password.
          </p>

          <StepIndicator step={step} />

          {step === 1 && (
            <StepEmail
              email={email}
              setEmail={setEmail}
              onSubmit={sendOtp}
            />
          )}

          {step === 2 && (
            <StepOtp
              otp={otp}
              setOtp={setOtp}
              onSubmit={verifyOtp}
            />
          )}

          {step === 3 && (
            <StepPassword
              password={password}
              setPassword={setPassword}
              onSubmit={resetPassword}
            />
          )}

          <Link
            href="/login"
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mt-2"
          >
            <CircleArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
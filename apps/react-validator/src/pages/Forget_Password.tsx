import axios from "axios";
import { CircleArrowLeft } from "lucide-react";
import getBackendUrl from "@/lib/config";
import { toast } from "sonner";
import StepIndicator from "../components/new_custom/ResetP_StepIndicator";
import StepEmail from "../components/new_custom/ResetP_StepEmail";
import StepOtp from "../components/new_custom/ResetP_StepOtp";
import StepPassword from "../components/new_custom/ResetP_StepPassword";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const stepImageMap: Record<number, string> = {
  1: "/forget-password/forgetPassword.png",
  2: "/forget-password/sentMail.png",
  3: "/forget-password/ResetPassword.png",
};

export type Step = 1 | 2 | 3;

export default function Forget_Password_Page() {
  const router = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    const URL = getBackendUrl();
    const response = await axios.post(`${URL}/validator/otp`, { email });
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
    const URL = getBackendUrl();
    const response = await axios.post(`${URL}/validator/forget-password`, { email, otp, newpassword:password });
    if(response.status === 200){
        toast.success("Your password was successfully reset");
        router("/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="w-full max-w-[700px] rounded-xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border border-white/40">
        
        <div className="w-full h-16 flex justify-between items-center px-6 border-b bg-white/60">
          <div className="flex items-center gap-2">
            <img
              src="/forget-password/Capital.png"
              alt="Capital Icon"
              width={20}
              height={20}
            />
            <h1 className="text-lg font-semibold">Capital</h1>
          </div>

          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center text-center px-10 py-10 gap-6">
          <img
            src= {stepImageMap[step]}
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

          <a
            href="/signin"
            className="text-sm text-gray-600 hover:text-indigo-600 flex items-center gap-1 transition"
          >
            <CircleArrowLeft className="h-4 w-4" />
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
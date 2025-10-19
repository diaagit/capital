"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleButton from "react-google-button";
import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthProps {
  type: "signup" | "signin";
}

interface InputProps {
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  setValue: (value: string) => void;
}

export default function AuthCard({ type }: AuthProps) {
  const router = useRouter();
  const key = process.env.CLOUDFLARE ?? "0x4AAAAAAB566d0mI8Oj-zyL";
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");

  const handleSignup = async () => {
    try {
      const result = await axios.post(`${process.env.BACKEND_URL}/user/signup`, { firstName, lastName, email, password, token });
      if (result.status === 200) {
        const jwt = result.data.token;
        localStorage.setItem("token", jwt);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignin = async () => {
    try {
      const result = await axios.post(`${process.env.BACKEND_URL}/user/signin`, { firstName, lastName, email, password, token });
      if (result.status === 200) {
        const jwt = result.data.token;
        localStorage.setItem("token", jwt);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const IconInput = ({
    icon: Icon,
    type = "text",
    placeholder,
    autoComplete,
    setValue
  }: InputProps) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="pl-9 h-10 focus:ring-2 focus:ring-purple-500"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="flex w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border border-white/40">

        <div className="hidden lg:flex w-1/2 bg-black text-white p-10 flex-col justify-center items-center relative gap-6 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-3xl"></div>
          <div className="relative z-10 w-full flex justify-center">
            <video
              src="/assets/phone-dark.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-sm rounded-lg shadow-xl"
            />
          </div>
          <div className="relative z-10 text-center max-w-md">
            <h1 className="text-5xl font-extrabold drop-shadow-lg mb-3">Capital</h1>
            <p className="text-lg text-gray-100 leading-relaxed">
              {type === "signup"
                ? "Your gateway to hosting and discovering unforgettable events. Create an account and join the community today."
                : "Welcome back! Log in to manage your bookings, host new events, and connect with others."}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-10 flex items-center justify-center">
          <Card className="w-full max-w-md border-none shadow-none bg-transparent">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 tracking-tight">
                {type === "signup" ? "Create your account" : "Welcome back"}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {type === "signup"
                  ? "Sign up to start exploring live events, venues, and communities."
                  : "Sign in to continue to your dashboard."}
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 mt-2">

              {type === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <IconInput
                    icon={User}
                    placeholder="First Name"
                    autoComplete="given-name"
                    setValue={setfirstName}
                  />
                  <IconInput
                    icon={User}
                    placeholder="Last Name"
                    autoComplete="family-name"
                    setValue={setlastName}
                  />
                </div>
              )}

              <IconInput
                icon={Mail}
                placeholder="you@example.com"
                autoComplete="email"
                setValue={setEmail}
              />    
              {type === "signin" && (
                <div className="flex justify-end -mt-3 -mb-5">
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
        
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete={type === "signup" ? "new-password" : "current-password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-10 pr-10 focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="w-full">
                <Turnstile
                  onSuccess={(token) => setToken(token)}
                  siteKey={key}
                />
              </div>

              <Button
                type="submit"
                disabled={!token}
                size="icon"
                className="w-full text-center text-lg p-7 bg-black text-white shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={type === "signup" ? handleSignup : handleSignin}
              >
                <ArrowUpRightIcon className="w-1.5 h-1.5 mr-2" />
                {type === "signup" ? "Sign up" : "Sign In"}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 w-full">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-gray-400 text-xs uppercase">or continue with</span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <div className="flex gap-4 w-full justify-center">
                <GoogleButton
                  disabled
                  onClick={() => console.log("Google button clicked")}
                />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {type === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-600 hover:underline font-medium">
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-indigo-600 hover:underline font-medium">
                      Sign up
                    </Link>
                  </>
                )}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By checking this box, you agree to our{" "}
                <Link href="#" className="text-blue-600 dark:text-blue-400 underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 dark:text-blue-400 underline">
                  privacy policy
                </Link>.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

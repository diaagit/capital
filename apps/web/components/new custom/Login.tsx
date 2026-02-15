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
import getBackendUrl from "@/lib/config";
import { toast } from "sonner";
import clsx from "clsx";

interface AuthProps {
  type: "signup" | "signin";
  usage: "user" | "organizer";
}

interface IconInputProps {
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

export const IconInput = React.memo(function IconInput({
  icon: Icon,
  type = "text",
  placeholder,
  autoComplete,
  value,
  setValue,
  className,
}: IconInputProps) {
  return (
    <div className={clsx("relative w-full", className)}>
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />

      <Input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="pl-9 h-10 focus:ring-2 focus:ring-purple-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
});

export default function AuthCard({ type, usage }: AuthProps) {
  const router = useRouter();
  const key = process.env.CLOUDFLARE_SITEKEY ?? "0x4AAAAAAB566d0mI8Oj-zyL";

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const submitRef = React.useRef<HTMLButtonElement>(null)
  const handleSignup = async () => {
    try {
      const URL = getBackendUrl();
      const result = await axios.post(
        usage === "user" ? `${URL}/user/signup` : `${URL}/organiser/signup`,
        { firstName, lastName, email, password, token }
      );
      
      localStorage.setItem("token", result.data.token);
      toast.success("You have receieved an OTP to verify your email");
      usage === "user" ? router.push("/verify") : router.push("/organizer/verify");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Signup did fail due to some error");
    }
  };

  const handleSignin = async () => {
    try {
      const URL = getBackendUrl();
      const result = await axios.post(
        usage === "user" ? `${URL}/user/signin` : `${URL}/organiser/signin`,
        { firstName, lastName, email, password, token }
      );
      localStorage.setItem("token", result.data.token);
      toast.success("You have successfully logged-In");
      usage === "user" ? router.push("/") : router.push("/organizer/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Signin did fail due to some error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="flex w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border border-white/40">

        <div className="hidden lg:flex w-1/2 bg-black text-white p-10 flex-col justify-center items-center relative gap-6 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-3xl" />
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
            <h1 className="text-5xl font-extrabold drop-shadow-lg mb-3">
              Capital
            </h1>
            <p className="text-lg text-gray-100 leading-relaxed">
              {usage === "organizer"
                ? type === "signup"
                  ? "Launch and manage your events with ease. Create your organizer account to host, sell tickets, and grow your audience."
                  : "Welcome back! Access your dashboard to manage events, track sales, and engage your attendees."
                : type === "signup"
                  ? "Your gateway to hosting and discovering unforgettable events. Create an account and join the community today."
                  : "Welcome back! Log in to manage your bookings, host new events, and connect with others."
              }
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
                {usage === "organizer"
                ? type === "signup"
                  ? "Sign up to create events, sell tickets, and manage your audience effortlessly."
                  : "Sign in to access your organizer dashboard and manage your events."
                : type === "signup"
                  ? "Sign up to start exploring live events, venues, and communities."
                  : "Sign in to continue to exploring events in your city."}
              </CardDescription>
            </CardHeader>

            <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitRef.current?.click();
                  }
                }}
              >
              <CardContent className="grid gap-4 mt-2">

                {type === "signup" && (
                  <div className="grid grid-cols-2 gap-3">
                    <IconInput
                      icon={User}
                      placeholder="First Name"
                      autoComplete="given-name"
                      value={firstName}
                      setValue={setfirstName}
                    />
                    <IconInput
                      icon={User}
                      placeholder="Last Name"
                      autoComplete="family-name"
                      value={lastName}
                      setValue={setlastName}
                    />
                  </div>
                )}

                <IconInput
                  icon={Mail}
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
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
                    value={password}
                    autoComplete={
                      type === "signup" ? "new-password" : "current-password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-10 pr-10 focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* <div className="w-full">
                  <Turnstile
                    onSuccess={(token) => setToken(token)}
                    siteKey={key}
                  />
                </div> */}

                <Button
                  type="button"
                  ref={submitRef}
                  className="w-full text-lg p-7 bg-black text-white"
                  onClick={type === "signup" ? handleSignup : handleSignin}
                >
                  <ArrowUpRightIcon className="mr-2 h-4 w-4" />
                  {type === "signup" ? "Sign up" : "Sign In"}
                </Button>

              </CardContent>
            </form>

            <CardFooter className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 w-full">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-gray-400 text-xs uppercase">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <GoogleButton disabled />

              <p className="text-sm text-gray-500 mt-2">
                {type === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <Link href={usage === "user" ? "/login" : "/organizer/login"} className="text-indigo-600 font-medium">
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <Link href={usage === "user" ? "/signup" : "/organizer/signup"} className="text-indigo-600 font-medium">
                      Sign up
                    </Link>
                  </>
                )}
              </p>

              <p className="text-xs text-gray-400 text-center">
                {usage === "user" ? (
                  <>
                    Want to publish events or movies?{" "}
                    <Link
                      href="/organizer/signup"
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Become an organizer
                    </Link>
                  </>
                ) : (
                  <>
                    Want to get tickets for events or movies?{" "}
                    <Link
                      href="/signup"
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      Become an user
                    </Link>
                  </>
                )
                }
              </p>
            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  );
}
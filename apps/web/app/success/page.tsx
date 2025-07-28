import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  // Simulate dynamic email (could be fetched or passed as query param)
  const email = "negarkhosravi1995@gmail.com";

  return (
    <div
      style={{
        backgroundImage: "url('/assets/T-thanksbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-screen flex items-center justify-center text-center"
    >
      <div className="text-white max-w-2xl mx-auto flex flex-col items-center gap-10">
        {/* Thank You Header */}
        <div>
          <h1 className="text-[#C14FE6] text-5xl font-bold">Thank You!</h1>
          <p className="text-2xl mt-2">Your payment was successful</p>
        </div>

        {/* Email Info */}
        <div>
          <p className="text-lg">Your tickets have been sent to:</p>
          <p className="text-lg font-semibold">{email}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-8 w-full">
          <Link href="/events">
            <Button
              variant="outline"
              className="bg-[#191919] text-[#C14FE6] w-40 py-6 border-2 border-[#C14FE6]
                hover:bg-[#C14FE6] hover:text-white transition duration-200
                hover:-translate-y-1 hover:scale-105"
            >
              Go Back
            </Button>
          </Link>
          <Link href="/">
            <Button
              className="bg-[#C14FE6] text-white w-40 py-6 border-2 border-[#C14FE6]
                hover:bg-[#A63DD9] transition duration-200
                hover:-translate-y-1 hover:scale-105"
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

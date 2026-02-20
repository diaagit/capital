import { Label } from "@radix-ui/react-label";
import { Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function StepEmail({
  email,
  setEmail,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="text-left">
        <Label>Email address</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ronak@example.com"
            className="pl-9"
          />
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full p-6 text-lg bg-black">
        <Mail className="mr-2 h-4 w-4" />
        Send OTP
      </Button>
    </div>
  );
}

export default StepEmail;
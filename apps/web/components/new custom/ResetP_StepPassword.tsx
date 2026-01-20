import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

function StepPassword({
  password,
  setPassword,
  onSubmit,
}: {
  password: string;
  setPassword: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="text-left">
        <Label>New Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-9"
          />
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full p-6 text-lg bg-black">
        Reset Password
      </Button>
    </div>
  );
}

export default StepPassword
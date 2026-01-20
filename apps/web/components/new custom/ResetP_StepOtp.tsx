import { Label } from "recharts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function StepOtp({
  otp,
  setOtp,
  onSubmit,
}: {
  otp: string;
  setOtp: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="text-left">
        <Label>OTP</Label>
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
      </div>

      <Button onClick={onSubmit} className="w-full p-6 text-lg bg-black">
        Verify OTP
      </Button>
    </div>
  );
}

export default StepOtp;
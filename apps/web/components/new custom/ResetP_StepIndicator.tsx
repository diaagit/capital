import { Step } from "@/app/forget-password/page";

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-4">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 w-16 rounded-full transition-all ${
            step >= s ? "bg-black" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default StepIndicator;
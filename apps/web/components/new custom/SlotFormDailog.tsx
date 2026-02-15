import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Info } from "lucide-react";

export interface SlotFormData {
  location_name: string;
  location_url: string;
  event_date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  price: number;
}

interface SlotFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SlotFormData) => void;
  initialData?: SlotFormData | null;
  mode: "create" | "edit";
}

const emptyForm: SlotFormData = {
  location_name: "",
  location_url: "",
  event_date: "",
  start_time: "",
  end_time: "",
  capacity: 50,
  price: 199,
};

export function SlotFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: SlotFormDialogProps) {
  const [form, setForm] = useState<SlotFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SlotFormData, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(initialData ?? emptyForm);
      setErrors({});
    }
  }, [open, initialData]);

  const update = <K extends keyof SlotFormData>(key: K, value: SlotFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof SlotFormData, string>> = {};

    if (!form.location_name.trim()) e.location_name = "Location name is required";
    if (!form.location_url.trim()) {
      e.location_url = "Location URL is required";
    } else if (!/^https:\/\/www\.google\.com\/maps\?q=/.test(form.location_url.trim())) {
      e.location_url = "URL must start with https://www.google.com/maps?q=";
    }
    if (!form.event_date) e.event_date = "Date is required";
    if (!form.start_time) e.start_time = "Start time is required";
    if (!form.end_time) e.end_time = "End time is required";
    if (form.start_time && form.end_time && form.start_time >= form.end_time)
      e.end_time = "End time must be after start time";
    if (!form.capacity || form.capacity < 1) e.capacity = "Capacity must be at least 1";
    if (form.price < 0) e.price = "Price cannot be negative";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add New Slot" : "Edit Slot"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details to create a new event slot."
              : "Update the slot details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <FieldGroup label="Location Name" error={errors.location_name}>
            <Input
              placeholder="e.g. Wadia College of Engineering"
              value={form.location_name}
              onChange={(e) => update("location_name", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup label="Location URL" error={errors.location_url}>
            <Input
              placeholder="https://www.google.com/maps?q=..."
              value={form.location_url}
              onChange={(e) => update("location_url", e.target.value)}
            />
            <div className="flex items-start gap-1.5 mt-1.5 p-2.5 rounded-lg bg-muted/60 border border-border">
              <Info size={14} className="text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                URL must be in this format only:
                <br />
                <code className="text-[11px] bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">
                  https://www.google.com/maps?q=Wadia%20College%20of%20Engineering
                </code>
              </p>
            </div>
          </FieldGroup>

          <FieldGroup label="Event Date" error={errors.event_date}>
            <Input
              type="date"
              value={form.event_date}
              onChange={(e) => update("event_date", e.target.value)}
            />
          </FieldGroup>

          <div className="grid grid-cols-2 gap-3">
            <FieldGroup label="Start Time" error={errors.start_time}>
              <Input
                type="time"
                value={form.start_time}
                onChange={(e) => update("start_time", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="End Time" error={errors.end_time}>
              <Input
                type="time"
                value={form.end_time}
                onChange={(e) => update("end_time", e.target.value)}
              />
            </FieldGroup>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FieldGroup label="Capacity" error={errors.capacity}>
              <Input
                type="number"
                min={1}
                value={form.capacity}
                onChange={(e) => update("capacity", Number(e.target.value))}
              />
            </FieldGroup>
            <FieldGroup label="Price (₹)" error={errors.price}>
              <Input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => update("price", Number(e.target.value))}
              />
            </FieldGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Create Slot" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FieldGroup({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
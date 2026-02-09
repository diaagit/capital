"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import getBackendUrl from "@/lib/config";
import { toast } from "sonner";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  TableIcon,
  Search,
  ArrowUpDown,
} from "lucide-react";

type Slot = {
  id: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
};

export default function OrganizerSlotPage({
  eventId,
}: {
  eventId: string;
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<"table" | "calendar">("table");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Slot | null>(null);

  const URL = getBackendUrl();
  const fetchSlots = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${URL}/events/${eventId}/slots`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSlots(res.data.slots || []);
    } catch {
      toast.error("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const filtered = useMemo(() => {
    let data = [...slots];

    if (search) {
      data = data.filter((s) =>
        s.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) =>
      sort === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return data;
  }, [slots, search, sort]);

  const deleteSlot = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${URL}/slots/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleted");
      fetchSlots();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">

        <h1 className="text-xl font-semibold">Slots</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              className="pl-9 w-56"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            defaultValue="asc"
            onValueChange={(v) => setSort(v as any)}
          >
            <SelectTrigger className="w-40">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Date Asc</SelectItem>
              <SelectItem value="desc">Date Desc</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() =>
              setView(view === "table" ? "calendar" : "table")
            }
          >
            {view === "table" ? (
              <CalendarDays className="h-4 w-4" />
            ) : (
              <TableIcon className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={() => setOpenModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Slot
          </Button>

        </div>
      </div>

      {view === "table" && (
        <Card className="rounded-xl">
          <CardContent className="p-0">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.date}</TableCell>
                    <TableCell>{slot.time}</TableCell>
                    <TableCell>{slot.location}</TableCell>
                    <TableCell>{slot.capacity}</TableCell>
                    <TableCell>₹{slot.price}</TableCell>

                    <TableCell className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditing(slot);
                          setOpenModal(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteSlot(slot.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </CardContent>
        </Card>
      )}

      {view === "calendar" && (
        <Card className="p-6 text-sm text-muted-foreground">
          Calendar view placeholder
          (you can plug react-big-calendar later)
        </Card>
      )}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Slot" : "Add Slot"}
            </DialogTitle>
          </DialogHeader>

          <SlotForm
            eventId={eventId}
            editing={editing}
            onClose={() => {
              setEditing(null);
              setOpenModal(false);
              fetchSlots();
            }}
          />

        </DialogContent>
      </Dialog>
    </div>
  );
}

function SlotForm({
  eventId,
  editing,
  onClose,
}: any) {
  const [form, setForm] = useState(
    editing || {
      date: "",
      time: "",
      location: "",
      capacity: 0,
      price: 0,
    }
  );

  const URL = getBackendUrl();

  const save = async () => {
    const token = localStorage.getItem("token");

    if (editing) {
      await axios.patch(`${URL}/slots/${editing.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(
        `${URL}/slots`,
        { ...form, eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    toast.success("Saved");
    onClose();
  };

  return (
    <div className="space-y-4">

      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <Input
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
      />

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <Input
        type="number"
        placeholder="Capacity"
        value={form.capacity}
        onChange={(e) =>
          setForm({ ...form, capacity: +e.target.value })
        }
      />

      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: +e.target.value })
        }
      />

      <Button className="w-full" onClick={save}>
        Save
      </Button>
    </div>
  );
}
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

interface OrganizerPaginationBarProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrganizerPaginationBar({
  page,
  totalPages,
  setPage,
  limit,
  setLimit,
}: OrganizerPaginationBarProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        <ChevronLeft size={16} />
      </Button>

      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        <ChevronRight size={16} />
      </Button>

      <Select
        value={limit.toString()}
        onValueChange={(v) => {
          setLimit(Number(v));
          setPage(1);
        }}
      >
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function OrganizerPaginationBar({ page, totalPages, setPage }: any) {
  return (
    <div className="flex items-center justify-center gap-6 py-6">
      <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage((p: number) => p - 1)}>
        <ChevronLeft size={16} />
      </Button>

      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>

      <Button variant="outline" size="icon" disabled={page === totalPages} onClick={() => setPage((p: number) => p + 1)}>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
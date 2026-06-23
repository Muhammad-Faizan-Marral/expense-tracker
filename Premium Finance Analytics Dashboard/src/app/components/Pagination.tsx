import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TransactionMeta } from "../../types/transaction.types";

interface Props {
  meta: TransactionMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: Props) {
  const { page, totalPages, total, limit } = meta;
  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  // Build page numbers around current
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <p className="text-xs text-muted-foreground">
        Showing <span className="text-foreground font-medium">{from}–{to}</span> of{" "}
        <span className="text-foreground font-medium">{total}</span> transactions
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-lg border border-border disabled:opacity-40 hover:bg-white/5 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
              style={
                p === page
                  ? { background: "#7c3aed", color: "#fff" }
                  : { background: "transparent" }
              }
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-lg border border-border disabled:opacity-40 hover:bg-white/5 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
import { motion } from "motion/react";
import { ChevronUp, ChevronDown, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type { Transaction, TransactionFilters } from "../../types/transaction.types";

const CATEGORY_COLORS: Record<string, string> = {
  FREELANCING: "#7c3aed",
  SALARY: "#10b981",
  INVESTMENT: "#f59e0b",
  FOOD: "#ef4444",
  SHOPPING: "#06b6d4",
  BILLS: "#a1a1aa",
  TRAVEL: "#8b5cf6",
  ENTERTAINMENT: "#f97316",
  OTHER: "#64748b",
};

const CATEGORY_LABEL: Record<string, string> = {
  FREELANCING: "Freelancing",
  SALARY: "Salary",
  INVESTMENT: "Investment",
  FOOD: "Food",
  SHOPPING: "Shopping",
  BILLS: "Bills",
  TRAVEL: "Travel",
  ENTERTAINMENT: "Entertainment",
  OTHER: "Other",
};

interface Props {
  transactions: Transaction[];
  filters: TransactionFilters;
  onSortChange: (col: "date" | "amount") => void;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
  loading?: boolean;
}

export function TransactionTable({
  transactions,
  filters,
  onSortChange,
  onEdit,
  onDelete,
  loading,
}: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const SortIcon = ({ col }: { col: "date" | "amount" }) => {
    if (filters.sortBy !== col) return null;
    return filters.sortDir === "asc" ? (
      <ChevronUp size={12} />
    ) : (
      <ChevronDown size={12} />
    );
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="rounded-2xl border border-border overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="border-b border-border"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Transaction
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th
                className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => onSortChange("date")}
              >
                <span className="flex items-center gap-1">
                  Date <SortIcon col="date" />
                </span>
              </th>
              <th
                className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors"
                onClick={() => onSortChange("amount")}
              >
                <span className="flex items-center justify-end gap-1">
                  Amount <SortIcon col="amount" />
                </span>
              </th>
              <th className="px-5 py-3.5 w-12" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    Loading transactions...
                  </div>
                </td>
              </tr>
            )}

            {!loading && transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                  No transactions found. Try adjusting your filters.
                </td>
              </tr>
            )}

            {!loading &&
              transactions.map((tx, i) => {
                const color = CATEGORY_COLORS[tx.category] ?? "#64748b";
                return (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.025 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Title + Notes */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium">{tx.title}</p>
                        {tx.notes && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {tx.notes}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${color}18`,
                          color,
                        }}
                      >
                        {CATEGORY_LABEL[tx.category] ?? tx.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(tx.createdAt)}
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 text-right">
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{ color: tx.type === "INCOME" ? "#10b981" : "#ef4444" }}
                      >
                        {tx.type === "INCOME" ? "+" : "-"}₹
                        {tx.amount.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-4">
                      <div className="relative flex justify-end">
                        <button
                          onClick={() =>
                            setActiveMenu(activeMenu === tx.id ? null : tx.id)
                          }
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <MoreHorizontal size={15} />
                        </button>

                        {activeMenu === tx.id && (
                          <>
                            {/* Backdrop to close */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveMenu(null)}
                            />
                            <div
                              className="absolute right-0 top-8 z-20 rounded-xl border border-border overflow-hidden shadow-xl min-w-32"
                              style={{ background: "#1a1a22" }}
                            >
                              <button
                                onClick={() => {
                                  onEdit(tx);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-left"
                              >
                                <Pencil size={13} className="text-violet-400" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  onDelete(tx);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-red-500/10 text-red-400 transition-colors text-left"
                              >
                                <Trash2 size={13} />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
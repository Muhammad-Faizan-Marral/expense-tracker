import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import type { Transaction } from "../../types/transaction.types";

interface Props {
  transactions: Transaction[];
  totalFromMeta?: number;
}

export function TransactionSummary({ transactions, totalFromMeta }: Props) {
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const cards = [
    {
      label: "Total Income",
      value: totalIncome,
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)",
      icon: ArrowUpRight,
      prefix: "+",
    },
    {
      label: "Total Expenses",
      value: totalExpense,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.08)",
      icon: ArrowDownRight,
      prefix: "-",
    },
    {
      label: "Net Balance",
      value: Math.abs(netBalance),
      color: netBalance >= 0 ? "#7c3aed" : "#ef4444",
      bg: netBalance >= 0 ? "rgba(124,58,237,0.08)" : "rgba(239,68,68,0.08)",
      icon: Wallet,
      prefix: netBalance >= 0 ? "" : "-",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-border p-4 flex items-center gap-4"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: c.bg }}
          >
            <c.icon size={18} style={{ color: c.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">{c.label}</p>
            <p className="text-lg font-bold leading-tight" style={{ color: c.color }}>
              {c.prefix}₹{c.value.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
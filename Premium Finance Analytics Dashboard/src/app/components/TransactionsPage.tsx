import { useState } from "react";
import { Plus, Search, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

import { useTransactions } from "../../hooks/useTransactions";
import { TransactionModal } from "../components/TransactionModal";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { TransactionSummary } from "../components/TransactionSummary";
import { TransactionTable } from "../components/TransactionTable";
import { Pagination } from "../components/Pagination";

import type {
  Transaction,
  Category,
  CreateTransactionPayload,
} from "../../types/transaction.types";

const CATEGORIES: { value: Category | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Categories" },
  { value: "FOOD", label: "Food" },
  { value: "SALARY", label: "Salary" },
  { value: "FREELANCING", label: "Freelancing" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "BILLS", label: "Bills" },
  { value: "TRAVEL", label: "Travel" },
  { value: "INVESTMENT", label: "Investment" },
  { value: "ENTERTAINMENT", label: "Entertainment" },
  { value: "OTHER", label: "Other" },
];

export function TransactionsPage() {
  const {transactions,meta,loading,error,filters,setFilters,refetch,addTransaction,editTransaction,removeTransaction} = useTransactions();
console.log(transactions,"transactions are here")
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  // Delete dialog state
  const [deletingTx, setDeletingTx] = useState<Transaction | null>(null);

  // ─── Handlers ────────────────────────────────────────────────────────────

  const openAddModal = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const openEditModal = (tx: Transaction) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleModalSubmit = async (payload: CreateTransactionPayload) => {
    if (editingTx) {
      await editTransaction(editingTx.id, payload);
    } else {
      await addTransaction(payload);
    }
  };

  const handleDelete = async () => {
    if (!deletingTx) return;
    await removeTransaction(deletingTx.id);
    setDeletingTx(null);
  };

  const handleSortChange = (col: "date" | "amount") => {
    if (filters.sortBy === col) {
      setFilters({ sortDir: filters.sortDir === "asc" ? "desc" : "asc" });
    } else {
      setFilters({ sortBy: col, sortDir: "desc" });
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and track all your financial activity
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white text-sm shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
        >
          <Plus size={16} />
          Add Transaction
        </motion.button>
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/30 text-sm text-red-400"
          style={{ background: "rgba(239,68,68,0.06)" }}
        >
          <AlertCircle size={16} className="shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={refetch}
            className="flex items-center gap-1 text-xs font-medium hover:text-red-300 transition-colors"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Summary */}
      <TransactionSummary
        transactions={transactions}
        totalFromMeta={meta?.total}
      />

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            value={filters.search ?? ""}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Search transactions..."
            type="text"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-violet-500 transition-colors"
            style={{ background: "#1c1c24" }}
          />
        </div>

        {/* Type */}
        <select
          value={filters.type ?? "ALL"}
          onChange={(e) => setFilters({ type: e.target.value as any })}
          className="px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
          style={{ background: "#1c1c24" }}
        >
          <option value="ALL">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category ?? "ALL"}
          onChange={(e) => setFilters({ category: e.target.value as any })}
          className="px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
          style={{ background: "#1c1c24" }}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Limit per page */}
        <select
          value={filters.limit ?? 10}
          onChange={(e) =>
            setFilters({ limit: parseInt(e.target.value), page: 1 })
          }
          className="px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
          style={{ background: "#1c1c24" }}
        >
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* Table */}
      <TransactionTable
        transactions={transactions}
        filters={filters}
        loading={loading}
        onSortChange={handleSortChange}
        onEdit={openEditModal}
        onDelete={(tx) => setDeletingTx(tx)}
      />

      {/* Pagination */}
      {meta && (
        <Pagination meta={meta} onPageChange={(p) => setFilters({ page: p })} />
      )}

      {/* Add / Edit modal */}
      <TransactionModal
        open={modalOpen}
        editingTx={editingTx}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Delete confirm */}
      <DeleteConfirmDialog
        open={!!deletingTx}
        title={deletingTx?.title}
        onCancel={() => setDeletingTx(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import type {
  Transaction,
  CreateTransactionPayload,
  Category,
} from "../../types/transaction.types";

const CATEGORIES: { value: Category; label: string }[] = [
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

interface Props {
  open: boolean;
  editingTx?: Transaction | null;
  onClose: () => void;
  onSubmit: (payload: CreateTransactionPayload) => Promise<void>;
}

const empty = (): CreateTransactionPayload => ({
  title: "",
  amount: 0,
  type: "EXPENSE",
  category: "OTHER",
  notes: "",
});

export function TransactionModal({ open, editingTx, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<CreateTransactionPayload>(empty());
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTx) {
      setForm({
        title: editingTx.title,
        amount: editingTx.amount,
        type: editingTx.type,
        category: editingTx.category,
        notes: editingTx.notes ?? "",
      });
    } else {
      setForm(empty());
    }
    setFormError(null);
  }, [editingTx, open]);

  const set = (k: keyof CreateTransactionPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: k === "amount" ? parseFloat(e.target.value) || 0 : e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.amount || form.amount <= 0) return setFormError("Amount must be greater than 0");
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err: any) {
      setFormError(err.message || "Failed to save transaction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-md rounded-2xl border border-border p-6 z-10"
            style={{ background: "#111116" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold">
                {editingTx ? "Edit Transaction" : "Add Transaction"}
              </h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-400 border border-red-500/30"
                style={{ background: "rgba(239,68,68,0.08)" }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Title</label>
                <input
                  type="text" required value={form.title} onChange={set("title")}
                  placeholder="e.g. Freelance Project Payment"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
                  style={{ background: "#1c1c24" }}
                />
              </div>

              {/* Amount + Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Amount (₹)</label>
                  <input
                    type="number" required min="1" step="0.01"
                    value={form.amount || ""} onChange={set("amount")}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
                    style={{ background: "#1c1c24" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Type</label>
                  <select
                    value={form.type} onChange={set("type")}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
                    style={{ background: "#1c1c24" }}
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Category</label>
                <select
                  value={form.category} onChange={set("category")}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors"
                  style={{ background: "#1c1c24" }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Notes <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea
                  value={form.notes} onChange={set("notes")}
                  placeholder="Add a note..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-violet-500 transition-colors resize-none"
                  style={{ background: "#1c1c24" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                disabled={submitting}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? "Saving..." : editingTx ? "Update Transaction" : "Add Transaction"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Filter, X, ChevronUp, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

type Category = "Food" | "Freelancing" | "Salary" | "Shopping" | "Bills" | "Travel" | "Investment" | "Entertainment";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: Category;
  date: string;
  notes: string;
}

const categoryColors: Record<Category, string> = {
  Freelancing: "#7c3aed", Salary: "#10b981", Investment: "#f59e0b",
  Food: "#ef4444", Shopping: "#06b6d4", Bills: "#a1a1aa", Travel: "#8b5cf6", Entertainment: "#f97316",
};

const initialTransactions: Transaction[] = [
  { id: 1, title: "TechCorp Freelance Project", amount: 45000, type: "income", category: "Freelancing", date: "2026-06-15", notes: "UI/UX design for fintech dashboard" },
  { id: 2, title: "AWS Cloud Services", amount: 3200, type: "expense", category: "Bills", date: "2026-06-15", notes: "Monthly cloud hosting" },
  { id: 3, title: "Swiggy Dinner", amount: 680, type: "expense", category: "Food", date: "2026-06-14", notes: "Biryani order" },
  { id: 4, title: "DesignStudio Payment", amount: 28000, type: "income", category: "Freelancing", date: "2026-06-14", notes: "Brand identity project" },
  { id: 5, title: "Mutual Fund SIP", amount: 10000, type: "expense", category: "Investment", date: "2026-06-13", notes: "Axis Bluechip Fund" },
  { id: 6, title: "Electricity Bill", amount: 2100, type: "expense", category: "Bills", date: "2026-06-12", notes: "MSEB monthly" },
  { id: 7, title: "Amazon Purchase", amount: 4500, type: "expense", category: "Shopping", date: "2026-06-11", notes: "Mechanical keyboard" },
  { id: 8, title: "Monthly Salary", amount: 85000, type: "income", category: "Salary", date: "2026-06-01", notes: "Full-time salary" },
  { id: 9, title: "Goa Trip Flights", amount: 8200, type: "expense", category: "Travel", date: "2026-06-10", notes: "Round trip IndiGo" },
  { id: 10, title: "Netflix + Spotify", amount: 1200, type: "expense", category: "Entertainment", date: "2026-06-09", notes: "Subscriptions" },
];

const CATEGORIES: Category[] = ["Food", "Freelancing", "Salary", "Shopping", "Bills", "Travel", "Investment", "Entertainment"];

const emptyForm = { title: "", amount: "", type: "expense" as "income" | "expense", category: "Food" as Category, date: new Date().toISOString().split("T")[0], notes: "" };

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleForm = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: Transaction = {
      id: Date.now(),
      title: form.title,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      notes: form.notes,
    };
    setTransactions([newTx, ...transactions]);
    setForm({ ...emptyForm });
    setShowModal(false);
  };

  const filtered = transactions
    .filter((tx) => {
      const q = search.toLowerCase();
      const matchSearch = tx.title.toLowerCase().includes(q) || tx.category.toLowerCase().includes(q);
      const matchType = filterType === "all" || tx.type === filterType;
      const matchCat = filterCategory === "all" || tx.category === filterCategory;
      return matchSearch && matchType && matchCat;
    })
    .sort((a, b) => {
      const factor = sortDir === "asc" ? 1 : -1;
      if (sortBy === "date") return factor * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return factor * (a.amount - b.amount);
    });

  const totalIncome = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const toggleSort = (col: "date" | "amount") => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Manage and track all your financial activity</p>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white text-sm"
          style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
          <Plus size={16} />
          Add Transaction
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Income", value: totalIncome, color: "#10b981", icon: ArrowUpRight },
          { label: "Total Expenses", value: totalExpense, color: "#ef4444", icon: ArrowDownRight },
          { label: "Net Balance", value: totalIncome - totalExpense, color: totalIncome - totalExpense >= 0 ? "#7c3aed" : "#ef4444", icon: ArrowUpRight },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold" style={{ color: s.color }}>₹{Math.abs(s.value).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..." type="text"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            style={{ background: "#1c1c24" }} />
        </div>

        <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)}
          className="px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
          style={{ background: "#1c1c24" }}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
          style={{ background: "#1c1c24" }}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border" style={{ background: "rgba(255,255,255,0.02)" }}>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transaction</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground"
                  onClick={() => toggleSort("date")}>
                  <span className="flex items-center gap-1">
                    Date {sortBy === "date" ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
                  </span>
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground"
                  onClick={() => toggleSort("amount")}>
                  <span className="flex items-center justify-end gap-1">
                    Amount {sortBy === "amount" ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium">{tx.title}</p>
                      {tx.notes && <p className="text-xs text-muted-foreground mt-0.5">{tx.notes}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${categoryColors[tx.category]}18`, color: categoryColors[tx.category] }}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{tx.date}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-bold" style={{ color: tx.type === "income" ? "#10b981" : "#ef4444" }}>
                      {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No transactions found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60" style={{ backdropFilter: "blur(8px)" }}
              onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-border p-6 z-10"
              style={{ background: "#111116" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold">Add Transaction</h3>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Title</label>
                  <input type="text" required value={form.title} onChange={handleForm("title")}
                    placeholder="e.g. Freelance Project Payment"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "#1c1c24" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Amount (₹)</label>
                    <input type="number" required min="1" value={form.amount} onChange={handleForm("amount")}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                      style={{ background: "#1c1c24" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Type</label>
                    <select value={form.type} onChange={handleForm("type")}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                      style={{ background: "#1c1c24" }}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Category</label>
                    <select value={form.category} onChange={handleForm("category")}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                      style={{ background: "#1c1c24" }}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Date</label>
                    <input type="date" required value={form.date} onChange={handleForm("date")}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                      style={{ background: "#1c1c24", colorScheme: "dark" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Notes</label>
                  <textarea value={form.notes} onChange={handleForm("notes")}
                    placeholder="Optional note..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors resize-none"
                    style={{ background: "#1c1c24" }} />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
                  Add Transaction
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

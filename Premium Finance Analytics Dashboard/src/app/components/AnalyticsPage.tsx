import { motion } from "motion/react";
import {
  TrendingUp, TrendingDown, Activity, Wallet,
  AlertCircle, RefreshCw, Loader2,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useAnalytics } from "../../hooks/useAnalytics";

// ─── Constants ────────────────────────────────────────────────────────────────

// Backend returns lowercase category keys e.g. "food", "salary"
const CATEGORY_COLORS: Record<string, string> = {
  food: "#ef4444",
  salary: "#10b981",
  freelancing: "#7c3aed",
  shopping: "#06b6d4",
  bills: "#a1a1aa",
  travel: "#8b5cf6",
  investment: "#f59e0b",
  entertainment: "#f97316",
  other: "#64748b",
};

const CATEGORY_LABEL: Record<string, string> = {
  food: "Food & Dining",
  salary: "Salary",
  freelancing: "Freelancing",
  shopping: "Shopping",
  bills: "Bills & Utilities",
  travel: "Travel",
  investment: "Investment",
  entertainment: "Entertainment",
  other: "Other",
};

const tooltipStyle = {
  background: "#111116",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 10,
  color: "#fafafa",
  fontSize: 12,
};

const fmt = (v: number) => `₹${v.toLocaleString("en-IN")}`;
const fmtK = (v: number) =>
  v >= 100000 ? `₹${(v / 100000).toFixed(1)}L`
  : v >= 1000 ? `₹${(v / 1000).toFixed(0)}k`
  : `₹${v}`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl animate-pulse ${className}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    />
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AnalyticsPage() {
  const {
    dashboardStats,
    categoryData,
    monthlyData,
    dailyData,
    dayFilter,
    setDayFilter,
    loading,
    error,
    refetch,
  } = useAnalytics();

  // ── Stat cards derived from dashboard response ─────────────────────────────
  const statCards = dashboardStats
    ? [
        {
          label: "Total Income",
          value: fmt(dashboardStats.totalIncome),
          sub: "All time earnings",
          icon: TrendingUp,
          color: "#10b981",
        },
        {
          label: "Total Expenses",
          value: fmt(dashboardStats.totalExpense),
          sub: "All time spending",
          icon: TrendingDown,
          color: "#ef4444",
        },
        {
          label: "Net Balance",
          value: fmt(Math.abs(dashboardStats.balance)),
          sub: dashboardStats.balance >= 0 ? "Surplus ↑" : "Deficit ↓",
          icon: Wallet,
          color: dashboardStats.balance >= 0 ? "#7c3aed" : "#ef4444",
        },
        {
          label: "Savings Rate",
          value: `${dashboardStats.savingsRate}%`,
          sub: "Of total income saved",
          icon: Activity,
          color: "#06b6d4",
        },
      ]
    : [];

  // ── Pie data — backend sends lowercase category ────────────────────────────
  const pieData = categoryData.map((c) => ({
    name: CATEGORY_LABEL[c.category] ?? c.category,
    value: c.total,
    color: CATEGORY_COLORS[c.category] ?? "#64748b",
    category: c.category,
  }));

  // ── Monthly chart — savings already added by service layer ─────────────────
  const monthlyChartData = monthlyData.map((m) => ({
    month: m.month,      // already "Jun", "Jul" from TO_CHAR
    income: m.income,
    expense: m.expense,
    savings: m.savings ?? 0,
  }));

  // ── Daily chart ────────────────────────────────────────────────────────────
  const dailyChartData = dailyData.map((d) => ({
    day: new Date(d.date).toLocaleDateString("en-US", {
      month: "short", day: "numeric",
    }),
    income: d.income,
    expense: d.expense,
  }));

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(239,68,68,0.1)" }}
        >
          <AlertCircle size={26} className="text-red-400" />
        </div>
        <div className="text-center">
          <p className="font-semibold">Failed to load analytics</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-white/5 transition-colors"
        >
          <RefreshCw size={14} /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Deep dive into your financial performance
          </p>
        </div>
        <div
          className="flex gap-1 p-1 rounded-xl border border-border"
          style={{ background: "#111116" }}
        >
          {([7, 30] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDayFilter(d)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={
                dayFilter === d
                  ? { background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff" }
                  : { color: "#71717a" }
              }
            >
              Last {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)
          : statCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} whileHover={{ y: -2 }}
                className="rounded-2xl border border-border p-5 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-15 pointer-events-none"
                  style={{ background: card.color }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}18` }}
                >
                  <card.icon size={18} style={{ color: card.color }} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                <p className="text-xl font-bold mb-1">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.sub}</p>
              </motion.div>
            ))}
      </div>

      {/* ── Income vs Expenses Area + Pie ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="text-sm font-semibold mb-0.5">Income vs Expenses</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly trend</p>
          {loading ? (
            <Skeleton className="h-52" />
          ) : monthlyChartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
              No monthly data yet. Add some transactions!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyChartData}>
                <defs>
                  {[
                    { id: "incG", color: "#7c3aed" },
                    { id: "expG", color: "#ef4444" },
                    { id: "savG", color: "#10b981" },
                  ].map(({ id, color }) => (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [fmt(v), ""]} />
                <Area type="monotone" dataKey="income"  stroke="#7c3aed" fill="url(#incG)" strokeWidth={2} dot={false} name="Income" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="url(#expG)" strokeWidth={2} dot={false} name="Expense" />
                <Area type="monotone" dataKey="savings" stroke="#10b981" fill="url(#savG)" strokeWidth={2} dot={false} name="Savings" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="text-sm font-semibold mb-0.5">Expense Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">By category</p>
          {loading ? (
            <Skeleton className="h-44" />
          ) : pieData.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-sm text-muted-foreground">
              No expense data yet
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData} cx="50%" cy="50%"
                    innerRadius={46} outerRadius={70}
                    dataKey="value" strokeWidth={0} paddingAngle={3}
                  >
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [fmt(v), ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3 max-h-36 overflow-y-auto pr-1">
                {pieData.map((d) => (
                  <div key={d.category} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                      <span className="text-muted-foreground truncate max-w-24">{d.name}</span>
                    </div>
                    <span className="font-semibold">{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* ── Daily Bar Chart ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-2xl border border-border p-5"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Daily Activity</h3>
            <p className="text-xs text-muted-foreground">Last {dayFilter} days income & expense</p>
          </div>
          {loading && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
        </div>

        {!loading && dailyChartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
            No data for this period
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={dailyChartData}
                barSize={dayFilter === 7 ? 28 : 8}
                barGap={2}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={dayFilter === 30 ? 4 : 0}
                />
                <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [fmt(v), ""]} />
                <Bar dataKey="income"  fill="#7c3aed" radius={[4,4,0,0]} name="Income"  fillOpacity={0.85} />
                <Bar dataKey="expense" fill="#ef4444" radius={[4,4,0,0]} name="Expense" fillOpacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-5 mt-3">
              {[{ color: "#7c3aed", label: "Income" }, { color: "#ef4444", label: "Expense" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* ── Category Table ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="rounded-2xl border border-border overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">Category Breakdown</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Expense spending by category — all time</p>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
          </div>
        ) : categoryData.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No category data yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {[...categoryData]
              .sort((a, b) => b.total - a.total)
              .map((c, i) => {
                const color = CATEGORY_COLORS[c.category] ?? "#64748b";
                const label = CATEGORY_LABEL[c.category] ?? c.category;
                const maxTotal = Math.max(...categoryData.map((x) => x.total));
                const pct = maxTotal > 0 ? (c.total / maxTotal) * 100 : 0;

                return (
                  <div key={c.category} className="px-5 py-3.5 flex items-center gap-4">
                    <span className="text-xs text-muted-foreground w-4 shrink-0 tabular-nums">
                      {i + 1}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold uppercase"
                      style={{ background: `${color}18`, color }}
                    >
                      {label[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-sm font-bold tabular-nums" style={{ color }}>
                          {fmt(c.total)}
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </motion.div>

    </div>
  );
}
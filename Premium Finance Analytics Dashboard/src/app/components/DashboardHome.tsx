import { motion } from "motion/react";
import {
  Wallet,
  DollarSign,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../hooks/useTransactions";
import { useAnalytics } from "../../hooks/useAnalytics";

// ─── Constants ────────────────────────────────────────────────────────────────

const PIE_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#f97316"];

const CATEGORY_COLORS: Record<string, string> = {
  freelancing: "#7c3aed",
  salary: "#10b981",
  investment: "#f59e0b",
  food: "#ef4444",
  shopping: "#06b6d4",
  bills: "#a1a1aa",
  travel: "#8b5cf6",
  entertainment: "#f97316",
  other: "#64748b",
};

const CATEGORY_LABEL: Record<string, string> = {
  food: "Food",
  salary: "Salary",
  freelancing: "Freelancing",
  shopping: "Shopping",
  bills: "Bills",
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
  v >= 100000
    ? `₹${(v / 100000).toFixed(1)}L`
    : v >= 1000
      ? `₹${(v / 1000).toFixed(0)}k`
      : `₹${v}`;

const getGreeting = () => {
  const hrs = new Date().getHours();
  if (hrs < 12) return "Good morning";
  if (hrs < 18) return "Good afternoon";
  return "Good evening";
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl animate-pulse ${className}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DashboardHome() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const { transactions, loading: txLoading } = useTransactions();

  const {
    dashboardStats,
    categoryData,
    monthlyData,
    loading: analyticsLoading,
  } = useAnalytics();

  const loading = txLoading || analyticsLoading;

  // ── Derived values ──────────────────────────────────────────────────────────
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((s, t) => s + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // ── Stat cards ──────────────────────────────────────────────────────────────
  const statCards = [
    {
      label: "Total Balance",
      value: loading ? "—" : fmt(netBalance),
      up: netBalance >= 0,
      icon: Wallet,
      color: "#7c3aed",
    },
    {
      label: "Total Income",
      value: loading ? "—" : fmt(totalIncome),
      up: true,
      icon: DollarSign,
      color: "#10b981",
    },
    {
      label: "Total Expenses",
      value: loading ? "—" : fmt(totalExpense),
      up: false,
      icon: CreditCard,
      color: "#ef4444",
    },
    {
      label: "Savings Rate",
      value: loading ? "—" : `${dashboardStats?.savingsRate ?? 0}%`,
      up: (dashboardStats?.savingsRate ?? 0) >= 0,
      icon: PiggyBank,
      color: "#f59e0b",
    },
  ];

  // ── Monthly chart data ──────────────────────────────────────────────────────
  const monthlyChartData = monthlyData.map((m) => ({
    month: m.month,
    income: m.income,
    expense: m.expense,
    savings: m.savings ?? 0,
  }));

  // ── Pie chart — income sources from categoryData filtered by INCOME type
  // categoryData usually has expense breakdown; use dashboardStats for income split if available
  // Fallback: show top expense categories as pie
  const pieData = categoryData
    .slice(0, 6)
    .map((c, i) => ({
      name: CATEGORY_LABEL[c.category] ?? c.category,
      value: c.total,
      color: PIE_COLORS[i],
    }));

  // ── Recent transactions — last 9 from the fetched list ─────────────────────
  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 9);

  // ── Category bar chart data ─────────────────────────────────────────────────
  const categoryChartData = [...categoryData]
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
    .map((c) => ({
      name: CATEGORY_LABEL[c.category] ?? c.category,
      amount: c.total,
    }));

  // ── Format transaction date ─────────────────────────────────────────────────
  const formatTxDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    const timeStr = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (diffDays === 0) return `Today, ${timeStr}`;
    if (diffDays === 1) return `Yesterday, ${timeStr}`;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold">{getGreeting()} 👋</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here's your financial overview for{" "}
          {new Date().toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))
          : statCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-border p-5 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10 pointer-events-none"
                  style={{ background: card.color }}
                />
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.color}18` }}
                  >
                    <card.icon size={18} style={{ color: card.color }} />
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      background: card.up
                        ? "rgba(16,185,129,0.12)"
                        : "rgba(239,68,68,0.12)",
                      color: card.up ? "#10b981" : "#ef4444",
                    }}
                  >
                    {card.up ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {card.label}
                </p>
                <p className="text-2xl font-bold">{card.value}</p>
              </motion.div>
            ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold">Revenue vs Expenses</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Last 7 months performance
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {[
                { color: "#7c3aed", label: "Income" },
                { color: "#06b6d4", label: "Expenses" },
                { color: "#10b981", label: "Savings" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: l.color }}
                  />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {loading ? (
            <Skeleton className="h-52" />
          ) : monthlyChartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
              No monthly data yet. Add some transactions!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyChartData}>
                <defs>
                  {[
                    { id: "incGrad", color: "#7c3aed" },
                    { id: "expGrad", color: "#06b6d4" },
                    { id: "savGrad", color: "#10b981" },
                  ].map(({ id, color }) => (
                    <linearGradient
                      key={id}
                      id={id}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={fmtK}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [fmt(v), ""]}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#7c3aed"
                  fill="url(#incGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#06b6d4"
                  fill="url(#expGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Expense"
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#10b981"
                  fill="url(#savGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  name="Savings"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Pie Chart — Expense Breakdown by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="text-sm font-semibold mb-1">Expense Breakdown</h3>
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
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                    strokeWidth={0}
                    paddingAngle={3}
                  >
                    {pieData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [fmt(v), ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                {pieData.map((d, i) => (
                  <div
                    key={d.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: d.color }}
                      />
                      <span className="text-muted-foreground">{d.name}</span>
                    </div>
                    <span className="font-semibold">{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="text-sm font-semibold mb-1">Expenses by Category</h3>
          <p className="text-xs text-muted-foreground mb-4">
            {new Date().toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </p>

          {loading ? (
            <Skeleton className="h-52" />
          ) : categoryChartData.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
              No category data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryChartData} layout="vertical" barSize={8}>
                <XAxis
                  type="number"
                  tick={{ fill: "#71717a", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={fmtK}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={75}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [fmt(v), ""]}
                />
                <Bar dataKey="amount" fill="#7c3aed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Recent Transactions — last 9 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold">Recent Transactions</h3>
            <a
              href="/dashboard/transactions"
              className="text-xs font-medium hover:opacity-80 transition-opacity"
              style={{ color: "#7c3aed" }}
            >
              View all
            </a>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No transactions yet. Add your first one!
            </div>
          ) : (
            <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
              {recentTransactions.map((tx) => {
                const cat = tx.category?.toLowerCase() ?? "other";
                const color = CATEGORY_COLORS[cat] ?? "#7c3aed";
                const label = CATEGORY_LABEL[cat] ?? tx.category;
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{
                          background: `${color}18`,
                          color,
                        }}
                      >
                        {label.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight truncate max-w-[160px]">
                          {tx.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTxDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: tx.type === "INCOME" ? "#10b981" : "#ef4444",
                      }}
                    >
                      {tx.type === "INCOME" ? "+" : "-"}
                      {fmt(tx.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
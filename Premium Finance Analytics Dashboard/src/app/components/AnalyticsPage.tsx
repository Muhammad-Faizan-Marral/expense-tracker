import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

const monthlyData = [
  { month: "Jan", income: 42000, expenses: 28000, savings: 14000 },
  { month: "Feb", income: 38000, expenses: 31000, savings: 7000 },
  { month: "Mar", income: 55000, expenses: 29000, savings: 26000 },
  { month: "Apr", income: 47000, expenses: 33000, savings: 14000 },
  { month: "May", income: 63000, expenses: 35000, savings: 28000 },
  { month: "Jun", income: 58000, expenses: 30000, savings: 28000 },
  { month: "Jul", income: 72000, expenses: 38000, savings: 34000 },
];

const weeklyData = [
  { day: "Mon", amount: 4200 }, { day: "Tue", amount: 1800 }, { day: "Wed", amount: 6700 },
  { day: "Thu", amount: 2100 }, { day: "Fri", amount: 9800 }, { day: "Sat", amount: 3400 }, { day: "Sun", amount: 1200 },
];

const categoryPie = [
  { name: "Food & Dining", value: 18420, color: "#ef4444" },
  { name: "Investment", value: 22000, color: "#f59e0b" },
  { name: "Shopping", value: 9800, color: "#06b6d4" },
  { name: "Bills", value: 8500, color: "#a1a1aa" },
  { name: "Travel", value: 8200, color: "#8b5cf6" },
  { name: "Entertainment", value: 1200, color: "#f97316" },
];

const growthData = [
  { month: "Jan", netWorth: 520000, savings: 14000 },
  { month: "Feb", netWorth: 527000, savings: 7000 },
  { month: "Mar", netWorth: 553000, savings: 26000 },
  { month: "Apr", netWorth: 567000, savings: 14000 },
  { month: "May", netWorth: 595000, savings: 28000 },
  { month: "Jun", netWorth: 623000, savings: 28000 },
  { month: "Jul", netWorth: 657000, savings: 34000 },
];

const FILTERS = ["Last 7 Days", "Last 30 Days", "Last 6 Months", "This Year"] as const;

const analyticsCards = [
  { label: "Highest Spending", value: "Food & Dining", sub: "₹18,420 this month", icon: TrendingDown, color: "#ef4444" },
  { label: "Monthly Savings", value: "₹28,000", sub: "+18.6% vs last month", icon: TrendingUp, color: "#10b981" },
  { label: "Avg Daily Expense", value: "₹2,247", sub: "Across 30 days", icon: Activity, color: "#06b6d4" },
  { label: "Growth Rate", value: "+26.3%", sub: "Net worth this year", icon: Target, color: "#7c3aed" },
];

export function AnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>("Last 6 Months");

  const tooltipStyle = { background: "#111116", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, color: "#fafafa", fontSize: 12 };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Deep dive into your financial performance</p>
        </div>
        <div className="flex gap-2 p-1 rounded-xl border border-border" style={{ background: "#111116" }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={activeFilter === f
                ? { background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff" }
                : { color: "#71717a" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-border p-5 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: card.color }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${card.color}18` }}>
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
            <p className="text-xl font-bold mb-1">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Income vs Expenses Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl border border-border p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-semibold mb-1">Income vs Expenses</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly trend analysis</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="income" stroke="#7c3aed" fill="url(#incGrad2)" strokeWidth={2} dot={false} name="Income" />
              <Area type="monotone" dataKey="expenses" stroke="#06b6d4" fill="url(#expGrad2)" strokeWidth={2} dot={false} name="Expenses" />
              <Area type="monotone" dataKey="savings" stroke="#10b981" fill="url(#savGrad)" strokeWidth={2} dot={false} name="Savings" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-semibold mb-1">Expense Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">By category</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={categoryPie} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={0} paddingAngle={3}>
                {categoryPie.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryPie.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold">₹{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Spending Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-semibold mb-1">Daily Spending This Week</h3>
          <p className="text-xs text-muted-foreground mb-5">June 9–15, 2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} barSize={32}>
              <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]} />
              <Bar dataKey="amount" fill="#7c3aed" radius={[6, 6, 0, 0]}>
                {weeklyData.map((_, i) => (
                  <Cell key={i} fill={i === 4 ? "#ef4444" : "#7c3aed"} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-muted-foreground mt-2">
            <span style={{ color: "#ef4444" }}>Friday</span> was your highest spending day — ₹9,800
          </p>
        </motion.div>

        {/* Net Worth Growth Line */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="rounded-2xl border border-border p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-sm font-semibold">Net Worth Growth</h3>
              <p className="text-xs text-muted-foreground">Total portfolio value</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>
              +26.3% YTD
            </span>
          </div>
          <div className="mt-2 mb-4">
            <span className="text-3xl font-bold">₹6,57,000</span>
            <span className="text-sm text-muted-foreground ml-2">current</span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={growthData}>
              <defs>
                <linearGradient id="nwGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
              <Line type="monotone" dataKey="netWorth" stroke="url(#nwGrad)" strokeWidth={3} dot={{ fill: "#7c3aed", strokeWidth: 0, r: 4 }} name="Net Worth" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

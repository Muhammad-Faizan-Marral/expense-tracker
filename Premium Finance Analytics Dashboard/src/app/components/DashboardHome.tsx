import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
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
  Legend,
} from "recharts";

const areaData = [
  { month: "Jan", income: 42000, expenses: 28000 },
  { month: "Feb", income: 38000, expenses: 31000 },
  { month: "Mar", income: 55000, expenses: 29000 },
  { month: "Apr", income: 47000, expenses: 33000 },
  { month: "May", income: 63000, expenses: 35000 },
  { month: "Jun", income: 58000, expenses: 30000 },
  { month: "Jul", income: 72000, expenses: 38000 },
];

const categoryData = [
  { name: "Food", amount: 18420 },
  { name: "Travel", amount: 12300 },
  { name: "Shopping", amount: 9800 },
  { name: "Bills", amount: 8500 },
  { name: "Entertainment", amount: 6200 },
  { name: "Investment", amount: 22000 },
];

const pieData = [
  { name: "Freelancing", value: 42 },
  { name: "Salary", value: 28 },
  { name: "Investment", value: 18 },
  { name: "Other", value: 12 },
];

const PIE_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b"];

const recentTransactions = [
  {
    id: 1,
    title: "Freelance Project — TechCorp",
    category: "Freelancing",
    amount: 45000,
    type: "income",
    date: "Today, 2:30 PM",
  },
  {
    id: 2,
    title: "AWS Cloud Services",
    category: "Bills",
    amount: -3200,
    type: "expense",
    date: "Today, 10:15 AM",
  },
  {
    id: 3,
    title: "Swiggy Order",
    category: "Food",
    amount: -680,
    type: "expense",
    date: "Yesterday, 8:45 PM",
  },
  {
    id: 4,
    title: "Client Payment — DesignStudio",
    category: "Freelancing",
    amount: 28000,
    type: "income",
    date: "Yesterday, 3:20 PM",
  },
  {
    id: 5,
    title: "Mutual Fund SIP",
    category: "Investment",
    amount: -10000,
    type: "expense",
    date: "Jun 13, 9:00 AM",
  },
  {
    id: 6,
    title: "Electricity Bill",
    category: "Bills",
    amount: -2100,
    type: "expense",
    date: "Jun 12, 6:30 PM",
  },
];

const statCards = [
  {
    label: "Total Balance",
    value: "₹8,42,350",
    change: "+12.4%",
    up: true,
    icon: Wallet,
    color: "#7c3aed",
  },
  {
    label: "Monthly Income",
    value: "₹1,85,000",
    change: "+8.2%",
    up: true,
    icon: DollarSign,
    color: "#10b981",
  },
  {
    label: "Monthly Expenses",
    value: "₹67,420",
    change: "-3.1%",
    up: false,
    icon: CreditCard,
    color: "#ef4444",
  },
  {
    label: "Net Savings",
    value: "₹1,17,580",
    change: "+18.6%",
    up: true,
    icon: PiggyBank,
    color: "#f59e0b",
  },
];

const categoryColors: Record<string, string> = {
  Freelancing: "#7c3aed",
  Salary: "#10b981",
  Investment: "#f59e0b",
  Food: "#ef4444",
  Shopping: "#06b6d4",
  Bills: "#a1a1aa",
  Travel: "#8b5cf6",
  Entertainment: "#f97316",
};

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold">Good morning, Arjun 👋</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here's your financial overview for June 2026
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
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
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full`}
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
                {card.change}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
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
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#7c3aed" }}
                />
                Income
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#06b6d4" }}
                />
                Expenses
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
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
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#111116",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  color: "#fafafa",
                  fontSize: 12,
                }}
                formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#7c3aed"
                fill="url(#incGrad)"
                strokeWidth={2.5}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#06b6d4"
                fill="url(#expGrad)"
                strokeWidth={2.5}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border p-5"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="text-sm font-semibold mb-1">Income Sources</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Breakdown this month
          </p>
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
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#111116",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  color: "#fafafa",
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d, i) => (
              <div
                key={d.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: PIE_COLORS[i] }}
                  />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
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
          <p className="text-xs text-muted-foreground mb-4">June 2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical" barSize={8}>
              <XAxis
                type="number"
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#71717a", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  background: "#111116",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  color: "#fafafa",
                  fontSize: 12,
                }}
                formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]}
              />
              <Bar dataKey="amount" fill="#7c3aed" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Transactions */}
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
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{
                      background: `${categoryColors[tx.category] ?? "#7c3aed"}18`,
                      color: categoryColors[tx.category] ?? "#7c3aed",
                    }}
                  >
                    {tx.category.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight truncate max-w-[160px]">
                      {tx.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${tx.type === "income" ? "" : ""}`}
                  style={{
                    color: tx.type === "income" ? "#10b981" : "#ef4444",
                  }}
                >
                  {tx.type === "income" ? "+" : ""}₹
                  {Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}

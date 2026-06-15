import { motion } from "motion/react";
import { Download, FileText, TrendingUp, BarChart3, Calendar, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const reports = [
  { id: 1, month: "June 2026", income: 185000, expenses: 67420, savings: 117580, date: "Jun 15, 2026", status: "ready" },
  { id: 2, month: "May 2026", income: 163000, expenses: 71200, savings: 91800, date: "May 31, 2026", status: "ready" },
  { id: 3, month: "April 2026", income: 147000, expenses: 63800, savings: 83200, date: "Apr 30, 2026", status: "ready" },
  { id: 4, month: "March 2026", income: 155000, expenses: 59000, savings: 96000, date: "Mar 31, 2026", status: "ready" },
  { id: 5, month: "February 2026", income: 138000, expenses: 71000, savings: 67000, date: "Feb 28, 2026", status: "ready" },
  { id: 6, month: "January 2026", income: 142000, expenses: 68000, savings: 74000, date: "Jan 31, 2026", status: "ready" },
];

const summaryData = reports.map((r) => ({ month: r.month.split(" ")[0], income: r.income / 1000, expenses: r.expenses / 1000, savings: r.savings / 1000 })).reverse();

const categoryBreakdown = [
  { name: "Freelancing", value: 56, color: "#7c3aed" },
  { name: "Salary", value: 28, color: "#10b981" },
  { name: "Investment Returns", value: 11, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#71717a" },
];

const tooltipStyle = { background: "#111116", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, color: "#fafafa", fontSize: 12 };

export function ReportsPage() {
  const handleDownload = (month: string) => {
    const content = `FlowFinance AI — Financial Report\n${month}\n\nGenerated on ${new Date().toLocaleDateString()}\n\nThis report is a summary of your financial activity.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FlowFinance_Report_${month.replace(" ", "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Download and review your monthly financial reports</p>
      </div>

      {/* Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-semibold mb-1">6-Month Summary</h3>
          <p className="text-xs text-muted-foreground mb-5">Income vs Expenses (₹000s)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={summaryData} barGap={4} barSize={20}>
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${(v * 1000).toLocaleString()}`, ""]} />
              <Bar dataKey="income" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Expenses" />
              <Bar dataKey="savings" fill="#10b981" radius={[4, 4, 0, 0]} name="Savings" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[{ label: "Income", color: "#7c3aed" }, { label: "Expenses", color: "#06b6d4" }, { label: "Savings", color: "#10b981" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-sm font-semibold mb-1">Earnings Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">By source — YTD 2026</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0} paddingAngle={3}>
                {categoryBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {categoryBreakdown.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
                <span className="font-semibold ml-auto">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Reports List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Report History</h3>
          <span className="text-xs text-muted-foreground">{reports.length} reports available</span>
        </div>
        <div className="space-y-3">
          {reports.map((report, i) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-border p-4 flex items-center gap-4 hover:bg-secondary/20 transition-colors"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.12)" }}>
                <FileText size={18} style={{ color: "#7c3aed" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{report.month} Financial Report</p>
                <p className="text-xs text-muted-foreground mt-0.5">Generated {report.date}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-xs">
                <div className="text-right">
                  <p className="text-muted-foreground">Income</p>
                  <p className="font-semibold" style={{ color: "#10b981" }}>₹{report.income.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Expenses</p>
                  <p className="font-semibold" style={{ color: "#ef4444" }}>₹{report.expenses.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Savings</p>
                  <p className="font-semibold" style={{ color: "#7c3aed" }}>₹{report.savings.toLocaleString()}</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload(report.month)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-border hover:bg-secondary transition-all flex-shrink-0">
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Annual Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-2xl border border-border p-6 relative overflow-hidden"
        style={{ background: "rgba(124,58,237,0.06)" }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#7c3aed" }} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} style={{ color: "#7c3aed" }} />
              <h3 className="text-base font-semibold">Annual Report 2026</h3>
              <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">Coming Dec 31</span>
            </div>
            <p className="text-sm text-muted-foreground">Your complete financial year summary with tax insights, investment analysis, and projections for 2027.</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
            <BarChart3 size={16} />
            Get Notified
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import {
  TrendingUp, Zap, Shield, BarChart3, Brain, ArrowRight, Check,
  Star, ChevronDown, Sparkles, Globe, Lock, Activity, Menu, X
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
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

const pieData = [
  { name: "Freelancing", value: 42 },
  { name: "Salary", value: 28 },
  { name: "Investment", value: 18 },
  { name: "Other", value: 12 },
];
const PIE_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b"];

const features = [
  { icon: Brain, title: "AI-Powered Insights", desc: "Get smart financial recommendations powered by advanced ML models that learn from your spending patterns.", color: "#7c3aed" },
  { icon: BarChart3, title: "Real-Time Analytics", desc: "Visualize your cash flow with beautiful interactive charts that update instantly as you add transactions.", color: "#06b6d4" },
  { icon: Shield, title: "Bank-Level Security", desc: "256-bit encryption and two-factor authentication keeps your financial data completely secure at all times.", color: "#10b981" },
  { icon: Zap, title: "Smart Automation", desc: "Auto-categorize transactions, generate reports, and get alerts based on your custom spending thresholds.", color: "#f59e0b" },
  { icon: Globe, title: "Multi-Currency", desc: "Track finances in 150+ currencies with live exchange rates updated every 60 seconds from global markets.", color: "#ef4444" },
  { icon: Activity, title: "Budget Tracking", desc: "Set intelligent budgets with AI-assisted limits that adapt to your lifestyle and income patterns.", color: "#8b5cf6" },
];

const testimonials = [
  { name: "Arjun Sharma", role: "Freelance Designer", avatar: "AS", text: "FlowFinance AI completely transformed how I manage my freelance income. The AI insights caught overspending I never noticed.", rating: 5 },
  { name: "Priya Mehta", role: "Startup Founder", avatar: "PM", text: "As a founder, cash flow is everything. FlowFinance gives me clarity I never had before. Worth every rupee.", rating: 5 },
  { name: "Rahul Verma", role: "Content Creator", avatar: "RV", text: "The analytics dashboard is incredible. I finally understand where every rupee goes. My savings increased 34% in 3 months.", rating: 5 },
];

const plans = [
  {
    name: "Starter", price: "₹0", period: "/month", desc: "Perfect for individuals just getting started",
    features: ["Up to 100 transactions/month", "Basic analytics", "3 AI insights/week", "Email support"],
    cta: "Get Started Free", highlight: false,
  },
  {
    name: "Pro", price: "₹999", period: "/month", desc: "For serious freelancers and small businesses",
    features: ["Unlimited transactions", "Advanced analytics", "Unlimited AI insights", "Priority support", "PDF reports", "Multi-currency"],
    cta: "Start Pro Trial", highlight: true,
  },
  {
    name: "Business", price: "₹2,999", period: "/month", desc: "For teams and growing businesses",
    features: ["Everything in Pro", "Team collaboration", "Custom categories", "API access", "Dedicated manager", "White-label exports"],
    cta: "Contact Sales", highlight: false,
  },
];

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <span className="text-lg font-semibold tracking-tight">FlowFinance AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Analytics", "Pricing", "About"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors text-sm">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Sign In</Link>
            <Link to="/signup" className="text-sm px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>Get Started</Link>
          </div>

          <button className="md:hidden text-muted-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border p-4 flex flex-col gap-4" style={{ background: "rgba(9,9,11,0.95)" }}>
            {["Features", "Pricing", "About"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground text-sm" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <Link to="/login" className="text-sm text-muted-foreground">Sign In</Link>
            <Link to="/signup" className="text-sm px-4 py-2 rounded-lg font-medium text-center" style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>Get Started</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "#7c3aed" }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "#06b6d4" }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground mb-8"
              style={{ background: "rgba(124,58,237,0.1)" }}>
              <Sparkles size={12} style={{ color: "#7c3aed" }} />
              AI-Powered Financial Intelligence — 2026
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-none">
              Track Every Rupee.{" "}
              <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Analyze Every Decision.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-powered financial analytics dashboard for freelancers, creators, and businesses. Get insights that actually move the needle.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border text-foreground transition-all hover:border-muted-foreground hover:bg-secondary">
                Live Demo <Zap size={18} />
              </Link>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-6 text-xs text-muted-foreground">
              No credit card required · Free forever plan · Setup in 2 minutes
            </motion.p>
          </div>

          {/* Floating Dashboard Preview */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative">
            <div className="rounded-2xl border border-border overflow-hidden" style={{ background: "#111116", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border" style={{ background: "#0d0d12" }}>
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-60" />
                <div className="flex-1 mx-4 px-3 py-1 rounded text-xs text-muted-foreground border border-border" style={{ background: "#09090b" }}>
                  app.flowfinance.ai/dashboard
                </div>
              </div>

              {/* Dashboard preview content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Balance", value: "₹8,42,350", change: "+12.4%", color: "#7c3aed", up: true },
                  { label: "Monthly Income", value: "₹1,85,000", change: "+8.2%", color: "#10b981", up: true },
                  { label: "Monthly Expenses", value: "₹67,420", change: "-3.1%", color: "#ef4444", up: false },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl border border-border p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                    <p className="text-2xl font-bold mb-2">{card.value}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: card.up ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", color: card.up ? "#10b981" : "#ef4444" }}>
                      {card.change}
                    </span>
                  </div>
                ))}

                <div className="md:col-span-2 rounded-xl border border-border p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <p className="text-sm text-muted-foreground mb-3">Revenue vs Expenses</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={areaData}>
                      <defs>
                        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "#111116", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, color: "#fafafa" }} />
                      <Area type="monotone" dataKey="income" stroke="#7c3aed" fill="url(#incomeGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="expenses" stroke="#06b6d4" fill="url(#expGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-xl border border-border p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <p className="text-sm text-muted-foreground mb-3">Income Sources</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                        {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pieData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                        <span className="text-xs text-muted-foreground">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3" style={{ color: "#7c3aed" }}>Features</p>
            <h2 className="text-4xl font-bold mb-4">Everything you need to master your finances</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Built for the way modern creators and businesses actually work — with AI that gets smarter the more you use it.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-border p-6 group cursor-default"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section id="analytics" className="py-24 px-6" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#06b6d4" }}>Analytics</p>
              <h2 className="text-4xl font-bold mb-5 leading-tight">Charts that tell the full financial story</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">Our visualization engine transforms raw transaction data into actionable insights. See trends, spot anomalies, and understand patterns with sub-second chart rendering.</p>
              <ul className="space-y-3">
                {["Real-time data with no page reload", "Export-ready charts in PNG and SVG", "Custom date ranges and filters", "Compare periods side by side"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(6,182,212,0.15)" }}>
                      <Check size={12} style={{ color: "#06b6d4" }} />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-border p-6" style={{ background: "#111116" }}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold">Monthly Trends</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>+18.4% vs last month</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={areaData} barGap={4}>
                  <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#71717a", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "#111116", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, color: "#fafafa" }}
                    formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
                  <Bar dataKey="income" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-2xl border border-border p-6 space-y-4" style={{ background: "#111116" }}>
              {[
                { role: "ai", msg: "You are overspending on food this month — ₹18,420 vs your ₹12,000 budget. That's 53% over.", type: "warning" },
                { role: "user", msg: "How can I reduce my food expenses?" },
                { role: "ai", msg: "You saved 18% more than last month! Try meal prepping on Sundays and reducing takeout by 3 days/week. This could save ₹6,000+/month.", type: "success" },
                { role: "ai", msg: "Your entertainment expenses dropped 24% — great progress! Try redirecting ₹3,000 into your emergency fund.", type: "info" },
              ].map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: m.role === "ai" ? -10 : 10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  {m.role === "ai" && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                      <Brain size={14} color="#fff" />
                    </div>
                  )}
                  <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                    ? "text-white rounded-tr-sm"
                    : "text-foreground rounded-tl-sm"}`}
                    style={{
                      background: m.role === "user" ? "linear-gradient(135deg, #7c3aed, #8b5cf6)"
                        : m.type === "warning" ? "rgba(239,68,68,0.08)" : m.type === "success" ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.04)",
                      border: m.role === "ai" ? `1px solid ${m.type === "warning" ? "rgba(239,68,68,0.2)" : m.type === "success" ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.07)"}` : "none"
                    }}>
                    {m.msg}
                  </div>
                </motion.div>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full" style={{ background: "#7c3aed" }} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">FlowFinance AI is analyzing...</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#7c3aed" }}>AI Insights</p>
              <h2 className="text-4xl font-bold mb-5 leading-tight">Your personal AI financial advisor</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">Ask anything about your finances and get instant, personalized answers backed by your real transaction data. No generic advice — just insights tailored to you.</p>
              <Link to="/dashboard/ai-insights" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
                Try AI Insights <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by 12,000+ users</h2>
            <p className="text-muted-foreground">Join the community of smart financial thinkers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free, upgrade when you're ready</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-8 relative ${plan.highlight ? "border-primary" : "border-border"}`}
                style={{
                  background: plan.highlight ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)",
                  boxShadow: plan.highlight ? "0 0 60px rgba(124,58,237,0.15)" : "none"
                }}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>Most Popular</div>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check size={14} style={{ color: "#10b981" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 ${plan.highlight ? "text-white" : "text-foreground border border-border hover:bg-secondary"}`}
                  style={plan.highlight ? { background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" } : {}}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border border-border p-16 relative overflow-hidden"
            style={{ background: "rgba(124,58,237,0.08)" }}>
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />
            <h2 className="text-4xl font-bold mb-4 relative">Ready to take control of your finances?</h2>
            <p className="text-muted-foreground mb-8 relative">Join 12,000+ users who've transformed their financial lives with FlowFinance AI.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 relative"
              style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
              Start for Free — No Credit Card <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <span className="text-sm font-semibold">FlowFinance AI</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 FlowFinance AI. Built for the future of finance.</p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Security", "Support"].map((link) => (
                <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

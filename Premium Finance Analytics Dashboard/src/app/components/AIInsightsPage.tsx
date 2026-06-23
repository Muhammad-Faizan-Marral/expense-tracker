import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Send, TrendingUp, TrendingDown, PiggyBank, ShoppingBag, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useAIInsights } from "../../hooks/useAIInsights";

const suggestedQuestions = [
  "How can I reduce my biggest expense?",
  "What's my savings rate this month?",
  "Which category should I cut back on?",
  "How is my spending trending?",
];

export function AIInsightsPage() {
  const { dashboardStats, categoryData, loading: analyticsLoading } = useAnalytics();
  const { messages, loading, isTyping, error, askQuestion } = useAIInsights();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    askQuestion(text);
    setInput("");
  };

  // Real data se insight cards derive karo
  const insightCards = useMemo(() => {
    if (!dashboardStats) return [];

    const topCategory = [...categoryData].sort((a, b) => b.total - a.total)[0];

return [
      {
        icon: TrendingUp,
        title: "Total Income",
        desc: "Your total income in the last 30 days",
        value: `${dashboardStats.totalIncome.toLocaleString()}`, // Specific currency hatakar sirf number format kiya hai
        color: "#7c3aed",
      },
      {
        icon: TrendingDown,
        title: "Total Expense",
        desc: "Your total expense in the last 30 days",
        value: `${dashboardStats.totalExpense.toLocaleString()}`,
        color: "#ef4444",
      },
      {
        icon: PiggyBank,
        title: "Savings Rate",
        desc: "The portion of your income that you are saving",
        value: `${dashboardStats.savingsRate.toFixed(1)}%`,
        color: "#10b981",
      },
      {
        icon: ShoppingBag,
        title: "Top Category",
        desc: topCategory ? `${topCategory.category} is the highest spending category` : "No data available",
        value: topCategory ? `${topCategory.total.toLocaleString()}` : "—",
        color: "#f59e0b",
      },
    ];
  }, [dashboardStats, categoryData]);

  return (
    <div className="space-y-5 h-full">
      <div>
        <h2 className="text-2xl font-bold">AI Insights</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Your intelligent financial advisor powered by FlowFinance AI</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsLoading ? (
          <p className="text-sm text-muted-foreground col-span-full">Loading insights...</p>
        ) : (
          insightCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-border p-5 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="absolute top-0 right-0 w-14 h-14 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: card.color }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${card.color}18` }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{card.title}</p>
              <p className="text-lg font-bold mb-1">{card.value}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* Chat Interface */}
      <div className="rounded-2xl border border-border overflow-hidden flex flex-col" style={{ background: "#111116", height: 520 }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
              <Brain size={18} color="#fff" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card" style={{ background: "#10b981" }} />
          </div>
          <div>
            <p className="text-sm font-semibold">FlowFinance AI</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#10b981" }} />
              Active — analyzing your data
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading && (
            <p className="text-sm text-muted-foreground">Transactions analyze ...</p>
          )}
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                    <Bot size={14} color="#fff" />
                  </div>
                )}
                <div className="max-w-sm lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed prose prose-invert prose-sm"
                  style={msg.role === "user"
                    ? { background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", borderRadius: "18px 18px 4px 18px" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px 18px 18px 18px" }}>
                  {msg.role === "ai" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                <Bot size={14} color="#fff" />
              </div>
              <div className="px-4 py-3 rounded-2xl border border-border flex items-center gap-2" style={{ background: "rgba(255,255,255,0.04)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                    className="w-2 h-2 rounded-full" style={{ background: "#7c3aed" }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-5 py-2 border-t border-border flex gap-2 overflow-x-auto">
          {suggestedQuestions.map((q) => (
            <button key={q} onClick={() => handleSend(q)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-border hover:border-primary transition-colors whitespace-nowrap"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              {q}
            </button>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-border flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            style={{ background: "#1c1c24" }} />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => handleSend(input)} disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{ background: input.trim() ? "linear-gradient(135deg, #7c3aed, #8b5cf6)" : "rgba(255,255,255,0.05)" }}>
            <Send size={16} color={input.trim() ? "#fff" : "#71717a"} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Send, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Sparkles, Bot } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  type?: "warning" | "success" | "info" | "neutral";
}

const initialMessages: Message[] = [
  { id: 1, role: "ai", text: "Hello, Arjun! 👋 I'm FlowFinance AI, your personal financial advisor. I've analyzed your June 2026 transactions and have some insights ready for you.", type: "neutral" },
  { id: 2, role: "ai", text: "⚠️ You are overspending on Food & Dining this month — ₹18,420 spent vs your ₹12,000 budget. That's 53% over limit. Consider meal prepping or reducing takeout orders.", type: "warning" },
  { id: 3, role: "ai", text: "🎉 Great news! You saved 18% more this month compared to May — ₹28,000 vs ₹23,700. Your consistent SIP investments are compounding well.", type: "success" },
  { id: 4, role: "ai", text: "💡 Your entertainment expenses dropped 24% this month — down to ₹1,200. Try redirecting that ₹3,000+ saving into your emergency fund or index funds.", type: "info" },
];

const suggestedQuestions = [
  "How can I reduce food expenses?",
  "What's my savings rate this month?",
  "Which category has improved most?",
  "How's my investment performance?",
];

const aiResponses: Record<string, string> = {
  "How can I reduce food expenses?": "Based on your spending pattern, you order takeout ~14 times/month at ₹680 avg. Cutting to 6 orders saves ₹5,440/month. Try meal prepping Sunday evenings — it typically reduces food costs 40-60% for freelancers in your income bracket.",
  "What's my savings rate this month?": "Your June savings rate is 38.2% — you earned ₹1,85,000 and saved ₹70,700 (after accounting for SIP investments). This is excellent! The recommended savings rate for your income level is 25-35%, so you're beating it.",
  "Which category has improved most?": "Entertainment is your biggest improvement — down 66% from ₹3,600 (April peak) to ₹1,200 this month. Shopping also improved 28%. Your consistent discipline is reflecting in your net savings growth of +18.6%.",
  "How's my investment performance?": "Your Mutual Fund SIP of ₹10,000/month is performing well — Axis Bluechip delivered ~14.2% annualized returns. Your net worth grew from ₹5,20,000 in January to ₹6,57,000 today — a 26.3% increase in 6 months. 🚀",
};

const insightCards = [
  { icon: TrendingUp, title: "Top Earner", desc: "Freelancing contributes 70% of your income this month", value: "₹1,29,500", color: "#7c3aed", type: "positive" },
  { icon: TrendingDown, title: "Biggest Spend", desc: "Investment is your largest expense category", value: "₹22,000", color: "#f59e0b", type: "neutral" },
  { icon: AlertTriangle, title: "Over Budget", desc: "Food & Dining exceeded budget by 53%", value: "₹6,420 over", color: "#ef4444", type: "negative" },
  { icon: Lightbulb, title: "Opportunity", desc: "Redirect ₹5,000 from Food to investments", value: "+₹60k/year", color: "#10b981", type: "positive" },
];

export function AIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = aiResponses[text] ?? "That's a great question! Based on your current financial data, I'd recommend reviewing your transaction history in detail. I'm continuously learning from your patterns to give you better insights over time.";

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: response, type: "info" };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1600);
  };

  const msgBg = (type?: string) => {
    if (type === "warning") return { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)" };
    if (type === "success") return { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" };
    if (type === "info") return { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)" };
    return { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" };
  };

  return (
    <div className="space-y-5 h-full">
      <div>
        <h2 className="text-2xl font-bold">AI Insights</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Your intelligent financial advisor powered by FlowFinance AI</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {insightCards.map((card, i) => (
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
        ))}
      </div>

      {/* Chat Interface */}
      <div className="rounded-2xl border border-border overflow-hidden flex flex-col" style={{ background: "#111116", height: 520 }}>
        {/* Chat Header */}
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
          <div className="ml-auto flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: "#7c3aed" }} />
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const style = msgBg(msg.type);
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                      <Bot size={14} color="#fff" />
                    </div>
                  )}
                  <div className="max-w-sm lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={msg.role === "user"
                      ? { background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", borderRadius: "18px 18px 4px 18px" }
                      : { background: style.bg, border: `1px solid ${style.border}`, borderRadius: "4px 18px 18px 18px" }}>
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
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

        {/* Suggested */}
        <div className="px-5 py-2 border-t border-border flex gap-2 overflow-x-auto">
          {suggestedQuestions.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs border border-border hover:border-primary transition-colors whitespace-nowrap"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-4 border-t border-border flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            style={{ background: "#1c1c24" }} />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{ background: input.trim() ? "linear-gradient(135deg, #7c3aed, #8b5cf6)" : "rgba(255,255,255,0.05)" }}>
            <Send size={16} color={input.trim() ? "#fff" : "#71717a"} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

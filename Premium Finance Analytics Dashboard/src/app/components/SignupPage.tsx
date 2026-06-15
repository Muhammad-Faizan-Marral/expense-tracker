import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Sparkles, ArrowRight, Github, Mail, Check } from "lucide-react";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1400);
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["", "#ef4444", "#f59e0b", "#10b981"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "#7c3aed" }} />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#06b6d4" }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <span className="text-xl font-bold tracking-tight">FlowFinance AI</span>
        </div>

        <div className="rounded-2xl border border-border p-8" style={{ background: "rgba(17,17,22,0.8)", backdropFilter: "blur(20px)" }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-muted-foreground text-sm">Start your journey to financial clarity</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
              <Github size={16} />
              GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors">
              <Mail size={16} />
              Google
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or fill in your details</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input type="text" value={form.name} onChange={handleChange("name")}
                placeholder="Arjun Sharma" required
                className="w-full px-4 py-3 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                style={{ background: "#1c1c24" }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={handleChange("email")}
                placeholder="arjun@example.com" required
                className="w-full px-4 py-3 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                style={{ background: "#1c1c24" }} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange("password")}
                  placeholder="Create a strong password" required
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors pr-12"
                  style={{ background: "#1c1c24" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-1 flex-1 rounded-full transition-all"
                        style={{ background: n <= passwordStrength ? strengthColors[passwordStrength] : "rgba(255,255,255,0.1)" }} />
                    ))}
                  </div>
                  <span className="text-xs font-medium" style={{ color: strengthColors[passwordStrength] }}>{strengthLabels[passwordStrength]}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={handleChange("confirm")}
                  placeholder="Repeat your password" required
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors pr-12"
                  style={{ background: "#1c1c24" }} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirm.length > 0 && form.password === form.confirm && (
                <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#10b981" }}>
                  <Check size={12} /> Passwords match
                </p>
              )}
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all mt-2"
              style={{ background: loading ? "rgba(124,58,237,0.6)" : "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <><span>Create Account</span><ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-medium hover:text-foreground transition-colors" style={{ color: "#7c3aed" }}>Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">Terms</a> and{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}

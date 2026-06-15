import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Sparkles, ArrowRight, Github, Mail } from "lucide-react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: "#7c3aed" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "#06b6d4" }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <span className="text-xl font-bold tracking-tight">FlowFinance AI</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border p-8" style={{ background: "rgba(17,17,22,0.8)", backdropFilter: "blur(20px)" }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
          </div>

          {/* Social Buttons */}
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
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arjun@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                style={{ background: "#1c1c24" }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium">Password</label>
                <a href="#" className="text-xs hover:text-foreground transition-colors" style={{ color: "#7c3aed" }}>Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm placeholder:text-muted-foreground outline-none focus:border-primary transition-colors pr-12"
                  style={{ background: "#1c1c24" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: loading ? "rgba(124,58,237,0.6)" : "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <><span>Sign In</span><ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium hover:text-foreground transition-colors" style={{ color: "#7c3aed" }}>Create one free</Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">Terms</a> and{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}

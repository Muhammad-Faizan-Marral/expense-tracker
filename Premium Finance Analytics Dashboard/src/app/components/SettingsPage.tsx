import { useState } from "react";
import { motion } from "motion/react";
import { User, Lock, Bell, Palette, Trash2, Check, Eye, EyeOff, ChevronRight, Save } from "lucide-react";

const SECTIONS = ["Profile", "Password", "Notifications", "Theme", "Danger Zone"] as const;
type Section = typeof SECTIONS[number];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("Profile");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [notifs, setNotifs] = useState({ budgetAlerts: true, weeklyReport: true, aiInsights: true, transactions: false, marketing: false });
  const [profile, setProfile] = useState({ name: "Arjun Sharma", email: "arjun@example.com", phone: "+91 98765 43210", bio: "Freelance designer & investor. Building financial clarity one transaction at a time." });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sectionIcons: Record<Section, any> = { Profile: User, Password: Lock, Notifications: Bell, Theme: Palette, "Danger Zone": Trash2 };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account preferences and configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="rounded-2xl border border-border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
            {SECTIONS.map((s) => {
              const Icon = sectionIcons[s];
              const active = activeSection === s;
              return (
                <button key={s} onClick={() => setActiveSection(s)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm transition-all border-b border-border last:border-0 ${active ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"}`}
                  style={active ? { background: "rgba(124,58,237,0.15)", color: "#a78bfa" } : {}}>
                  <div className="flex items-center gap-3">
                    <Icon size={15} />
                    <span className="font-medium">{s}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-2xl border border-border p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
          {activeSection === "Profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <h3 className="text-base font-semibold mb-1">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">Update your personal information</p>
              </div>
              <div className="flex items-center gap-4 pb-5 border-b border-border">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>AS</div>
                <div>
                  <button className="text-sm font-medium px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors">Change Avatar</button>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "#1c1c24" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "#1c1c24" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone</label>
                  <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "#1c1c24" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Currency</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors"
                    style={{ background: "#1c1c24" }}>
                    <option>₹ INR — Indian Rupee</option>
                    <option>$ USD — US Dollar</option>
                    <option>€ EUR — Euro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Bio</label>
                <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3} className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors resize-none"
                  style={{ background: "#1c1c24" }} />
              </div>
              <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: saved ? "#10b981" : "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
                {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
              </motion.button>
            </motion.div>
          )}

          {activeSection === "Password" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <h3 className="text-base font-semibold mb-1">Change Password</h3>
                <p className="text-sm text-muted-foreground">Keep your account secure with a strong password</p>
              </div>
              {[
                { label: "Current Password", show: showOld, setShow: setShowOld },
                { label: "New Password", show: showNew, setShow: setShowNew },
                { label: "Confirm New Password", show: showNew, setShow: setShowNew },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <div className="relative">
                    <input type={field.show ? "text" : "password"} placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm outline-none focus:border-primary transition-colors pr-12"
                      style={{ background: "#1c1c24" }} />
                    <button type="button" onClick={() => field.setShow(!field.show)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-xl border border-border text-xs space-y-1.5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="font-medium text-muted-foreground mb-2">Password requirements:</p>
                {["At least 8 characters", "One uppercase letter", "One number", "One special character"].map((req) => (
                  <div key={req} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    </div>
                    {req}
                  </div>
                ))}
              </div>
              <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
                Update Password
              </button>
            </motion.div>
          )}

          {activeSection === "Notifications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <h3 className="text-base font-semibold mb-1">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Control what alerts you receive</p>
              </div>
              {[
                { key: "budgetAlerts", label: "Budget Alerts", desc: "Get notified when you approach or exceed spending limits" },
                { key: "weeklyReport", label: "Weekly Report", desc: "Receive a summary of your week's financial activity every Monday" },
                { key: "aiInsights", label: "AI Insights", desc: "Smart financial recommendations from FlowFinance AI" },
                { key: "transactions", label: "Transaction Alerts", desc: "Real-time notifications for every transaction" },
                { key: "marketing", label: "Product Updates", desc: "News about new features and improvements" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                  </div>
                  <button onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key as keyof typeof notifs] })}
                    className="w-11 h-6 rounded-full transition-all flex-shrink-0 relative"
                    style={{ background: notifs[n.key as keyof typeof notifs] ? "#7c3aed" : "rgba(255,255,255,0.1)" }}>
                    <motion.div animate={{ x: notifs[n.key as keyof typeof notifs] ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white" />
                  </button>
                </div>
              ))}
              <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: saved ? "#10b981" : "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
                {saved ? <><Check size={15} /> Saved!</> : "Save Preferences"}
              </motion.button>
            </motion.div>
          )}

          {activeSection === "Theme" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <h3 className="text-base font-semibold mb-1">Theme Settings</h3>
                <p className="text-sm text-muted-foreground">Customize your FlowFinance AI experience</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Appearance</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "dark", label: "Dark", preview: "#09090b" },
                    { value: "light", label: "Light", preview: "#fafafa" },
                    { value: "system", label: "System", preview: "linear-gradient(135deg, #09090b 50%, #fafafa 50%)" },
                  ].map((t) => (
                    <button key={t.value} onClick={() => setTheme(t.value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === t.value ? "border-primary" : "border-border hover:border-muted-foreground"}`}
                      style={{ background: theme === t.value ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)" }}>
                      <div className="w-full h-12 rounded-lg border border-border" style={{ background: t.preview }} />
                      <span className="text-xs font-medium">{t.label}</span>
                      {theme === t.value && <div className="w-2 h-2 rounded-full" style={{ background: "#7c3aed" }} />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"].map((c) => (
                    <button key={c} className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all hover:scale-110"
                      style={{ background: c, ringColor: "transparent" }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "Danger Zone" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div>
                <h3 className="text-base font-semibold mb-1" style={{ color: "#ef4444" }}>Danger Zone</h3>
                <p className="text-sm text-muted-foreground">These actions are irreversible. Please proceed with caution.</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Export All Data", desc: "Download all your transaction data, reports, and account information as a ZIP file.", action: "Export Data", color: "#f59e0b", danger: false },
                  { title: "Delete All Transactions", desc: "Permanently remove all transaction history. This cannot be undone.", action: "Delete Transactions", color: "#ef4444", danger: true },
                  { title: "Delete Account", desc: "Permanently delete your FlowFinance AI account and all associated data. This is irreversible.", action: "Delete Account", color: "#ef4444", danger: true },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-xl border flex items-center justify-between gap-4"
                    style={{ borderColor: item.danger ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)", background: item.danger ? "rgba(239,68,68,0.04)" : "rgba(245,158,11,0.04)" }}>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 max-w-sm">{item.desc}</p>
                    </div>
                    <button className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors hover:opacity-90"
                      style={{ borderColor: item.color, color: item.color, background: `${item.color}10` }}>
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Brain,
  FileText,
  Settings,
  LogOut,
  Sparkles,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  User,
} from "lucide-react";
import { logoutUser } from "../../services/user.service";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  {
    icon: ArrowLeftRight,
    label: "Transactions",
    path: "/dashboard/transactions",
  },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Brain, label: "AI Insights", path: "/dashboard/ai-insights" },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage =
    navItems.find((n) => n.path === location.pathname)?.label ?? "Dashboard";

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/", { replace: true });
    } catch (error) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:flex flex-col border-r border-border flex-shrink-0 overflow-hidden"
        style={{ background: "#0d0d12" }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            <Sparkles size={16} color="#fff" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 text-sm font-bold tracking-tight whitespace-nowrap overflow-hidden"
              >
                FlowFinance AI
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <ChevronRight
              size={16}
              className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${active ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(139,92,246,0.2))",
                        boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.3)",
                      }
                    : {}
                }
              >
                <item.icon
                  size={18}
                  className={`flex-shrink-0 ${active ? "text-white" : ""}`}
                  style={active ? { color: "#a78bfa" } : {}}
                />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && sidebarOpen && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "#7c3aed" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-border">
          <button
            onClick={() => handleLogout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <LogOut size={18} className="flex-shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 flex flex-col border-r border-border md:hidden"
              style={{ background: "#0d0d12" }}
            >
              <div className="h-16 flex items-center px-4 border-b border-border">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  }}
                >
                  <Sparkles size={16} color="#fff" />
                </div>
                <span className="ml-2 text-sm font-bold">FlowFinance AI</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="ml-auto text-muted-foreground"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-2 space-y-1">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? "text-white" : "text-muted-foreground"}`}
                      style={
                        active ? { background: "rgba(124,58,237,0.25)" } : {}
                      }
                    >
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-2 border-t border-border">
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header
          className="h-16 flex items-center px-4 md:px-6 border-b border-border flex-shrink-0"
          style={{
            background: "rgba(9,9,11,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <button
            className="md:hidden text-muted-foreground mr-3"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 flex items-center gap-4">
            <h1 className="text-base font-semibold hidden md:block">
              {currentPage}
            </h1>
          </div>
        </header>

        {/* Content */}
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{ background: "#09090b" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

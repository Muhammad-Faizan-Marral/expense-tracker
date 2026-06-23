  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // react-router-dom use karein
  import { LandingPage } from "./components/LandingPage";
  import { LoginPage } from "./components/LoginPage";
  import { SignupPage } from "./components/SignupPage";
  import { DashboardLayout } from "./components/DashboardLayout";
  import { DashboardHome } from "./components/DashboardHome";
  import { TransactionsPage } from "./components/TransactionsPage";
  import { AnalyticsPage } from "./components/AnalyticsPage";
  import { AIInsightsPage } from "./components/AIInsightsPage";
  import { ReportsPage } from "./components/ReportsPage";
  import { SettingsPage } from "./components/SettingsPage";
  import { AuthProvider } from "../context/AuthContext";
  import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

  export default function App() {
    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public/Open Routes */}
              <Route path="/" element={<LandingPage />} />

              {/* Un-authenticated Users Only (Login/Signup) */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>

              {/* Authenticated Users Only (Dashboard & Sub-routes) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="transactions" element={<TransactionsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="ai-insights" element={<AIInsightsPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Fallback Rouate */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
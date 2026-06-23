import api from "../lib/api";
import type {
  DashboardStats,
  CategoryStat,
  MonthlyData,
  DailyData,
} from "../types/analytics.types";

// GET /api/analytics/dashboard
// returns: { totalIncome, totalExpense, balance, savingsRate }
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get("/analytics/dashboard");
  return res.data;
};

// GET /api/analytics/categories
// returns: [{ category: "food", total: 4500 }]
export const fetchCategoryAnalytics = async (): Promise<CategoryStat[]> => {
  const res = await api.get("/analytics/categories");
  return Array.isArray(res.data) ? res.data : res.data.data ?? [];
};

// GET /api/analytics/monthly
// returns: [{ month: "Jun", income: 85000, expense: 4500 }]
export const fetchMonthlyAnalytics = async (): Promise<MonthlyData[]> => {
  const res = await api.get("/analytics/monthly");
  const raw: MonthlyData[] = Array.isArray(res.data) ? res.data : res.data.data ?? [];
  // savings backend mein nahi — derive karo
  return raw.map((m) => ({ ...m, savings: m.income - m.expense }));
};

// GET /api/analytics/last-days?days=7|30
// returns: [{ date: "2026-06-15", income: 0, expense: 4500 }]
export const fetchLastDaysAnalytics = async (days: number): Promise<DailyData[]> => {
  const res = await api.get("/analytics/last-days", { params: { days } });
  return Array.isArray(res.data) ? res.data : res.data.data ?? [];
};
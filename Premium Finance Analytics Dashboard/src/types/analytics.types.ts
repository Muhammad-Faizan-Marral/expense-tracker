// GET /api/analytics/dashboard
// backend returns: { totalIncome, totalExpense, balance, savingsRate }
// NOTE: totalTransactions nahi hai backend mein — removed
export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  savingsRate: number;
}

// GET /api/analytics/categories
// backend returns: [{ category: "food" (lowercase), total: number }]
// NOTE: count field nahi hai backend mein
export interface CategoryStat {
  category: string; // lowercase e.g. "food", "salary"
  total: number;
}

// GET /api/analytics/monthly
// backend returns: [{ month: "Jun", income: number, expense: number }]
// NOTE: savings field nahi — frontend calculate karega
export interface MonthlyData {
  month: string;   // "Jun", "Jul" etc (TO_CHAR format)
  income: number;
  expense: number;
  savings?: number; // frontend computed
}

// GET /api/analytics/last-days?days=30
// backend returns: [{ date: "2026-06-15", income: number, expense: number }]
export interface DailyData {
  date: string;
  income: number;
  expense: number;
}
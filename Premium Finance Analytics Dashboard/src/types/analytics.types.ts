// GET /api/analytics/dashboard
// backend returns: { totalIncome, totalExpense, balance, savingsRate }

export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  savingsRate: number;
}

// GET /api/analytics/categories
// backend returns: [{ category: "food" (lowercase), total: number }]

export interface CategoryStat {
  category: string; // lowercase e.g. "food", "salary"
  total: number;
}

// GET /api/analytics/monthly
// backend returns: [{ month: "Jun", income: number, expense: number }]

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
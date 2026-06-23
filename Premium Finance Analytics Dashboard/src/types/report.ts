// src/types/report.ts

export interface MonthlyReport {
  id: number;
  /** Full display label — e.g. "June 2026" */
  month: string;
  income: number;
  expenses: number;
  savings: number;
  /** Human-readable date the report was generated — e.g. "Jun 15, 2026" */
  generatedDate: string;
  /** True only for the current calendar month (has a real downloadable PDF) */
  isCurrentMonth: boolean;
}

export interface ChartPoint {
  /** Abbreviated month label — e.g. "Jan" */
  month: string;
  income: number;   // stored in thousands for the chart
  expenses: number;
  savings: number;
}

export interface EarningSource {
  name: string;
  /** Percentage share, 0–100 */
  value: number;
  color: string;
}
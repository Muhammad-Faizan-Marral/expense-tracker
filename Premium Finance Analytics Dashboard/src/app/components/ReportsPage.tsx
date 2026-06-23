// src/pages/Reports/index.tsx
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';

import { SummaryBarChart } from '../components/SummaryBarChart';
import { EarningsDonut } from '../components/EarningsDonut';
import { ReportHistoryList } from '../components/ReportHistoryList';
import { AnnualBanner } from '../components/AnnualBanner';

import { useMonthlyReport, CURRENT_MONTH_LABEL } from '../../hooks/useMonthlyReport';
import type { MonthlyReport, ChartPoint, EarningSource } from '../../types/report';

// ─────────────────────────────────────────────────────────────────────────────
// Static seed data
// TODO: Replace with real API calls once GET /api/reports/history is available
// ─────────────────────────────────────────────────────────────────────────────

const RAW_REPORTS: Omit<MonthlyReport, 'isCurrentMonth'>[] = [
  { id: 1, month: 'June 2026',    income: 185000, expenses: 67420, savings: 117580, generatedDate: 'Jun 15, 2026' },
  { id: 2, month: 'May 2026',     income: 163000, expenses: 71200, savings:  91800, generatedDate: 'May 31, 2026' },
  { id: 3, month: 'April 2026',   income: 147000, expenses: 63800, savings:  83200, generatedDate: 'Apr 30, 2026' },
  { id: 4, month: 'March 2026',   income: 155000, expenses: 59000, savings:  96000, generatedDate: 'Mar 31, 2026' },
  { id: 5, month: 'February 2026',income: 138000, expenses: 71000, savings:  67000, generatedDate: 'Feb 28, 2026' },
  { id: 6, month: 'January 2026', income: 142000, expenses: 68000, savings:  74000, generatedDate: 'Jan 31, 2026' },
];

/** Attach isCurrentMonth flag — computed from today's date, not hardcoded */
const REPORTS: MonthlyReport[] = RAW_REPORTS.map((r) => ({
  ...r,
  isCurrentMonth: r.month === CURRENT_MONTH_LABEL,
}));

/** Bar chart data — oldest → newest, values in thousands */
const CHART_DATA: ChartPoint[] = [...RAW_REPORTS].reverse().map((r) => ({
  month:    r.month.split(' ')[0],   // "January" → "Jan" … keeping first word
  income:   r.income   / 1000,
  expenses: r.expenses / 1000,
  savings:  r.savings  / 1000,
}));

const EARNINGS_SOURCES: EarningSource[] = [
  { name: 'Freelancing',        value: 56, color: '#7c3aed' },
  { name: 'Salary',             value: 28, color: '#10b981' },
  { name: 'Investment Returns', value: 11, color: '#f59e0b' },
  { name: 'Other',              value:  5, color: '#71717a' },
];

// ─────────────────────────────────────────────────────────────────────────────

export function ReportsPage() {
  const { download, isDownloading, downloadError, clearError } = useMonthlyReport();

  return (
    <div className="space-y-6">

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Download and review your monthly financial reports
        </p>
      </div>

      {/* ── Error Banner (animated in/out) ────────────────────────────────── */}
      <AnimatePresence>
        {downloadError && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm overflow-hidden"
            style={{
              background: 'rgba(239,68,68,0.07)',
              borderColor: 'rgba(239,68,68,0.25)',
              color: '#f87171',
            }}
          >
            <AlertCircle size={16} className="flex-shrink-0" />
            <span className="flex-1">{downloadError}</span>
            <button
              onClick={clearError}
              aria-label="Dismiss error"
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Charts Row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SummaryBarChart data={CHART_DATA} />
        <EarningsDonut   data={EARNINGS_SOURCES} />
      </div>

      {/* ── Report History List ───────────────────────────────────────────── */}
      <ReportHistoryList
        reports={REPORTS}
        onDownload={download}
        isDownloading={isDownloading}
      />

      {/* ── Annual Report Banner ──────────────────────────────────────────── */}
      <AnnualBanner />

    </div>
  );
}
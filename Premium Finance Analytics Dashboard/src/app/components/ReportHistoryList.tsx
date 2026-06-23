// src/pages/Reports/components/ReportHistoryCard.tsx
import { motion } from 'motion/react';
import { FileText, Download, Loader2, Lock } from 'lucide-react';
import type { MonthlyReport } from '../../types/report';

interface Props {
  report: MonthlyReport;
  /** Position index — used for staggered entrance animation */
  index: number;
  onDownload: (monthLabel: string) => void;
  /** True while ANY download is in-flight (we disable all buttons to avoid double-clicks) */
  isDownloading: boolean;
}

export function ReportHistoryList({ report, index, onDownload, isDownloading }: Props) {
  const { isCurrentMonth } = report;
  // Show spinner only on the card that is actually being downloaded
  const isThisDownloading = isDownloading && isCurrentMonth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl border border-border p-4 flex items-center gap-4 hover:bg-secondary/20 transition-colors"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      {/* File icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(124,58,237,0.12)' }}
      >
        <FileText size={18} style={{ color: '#7c3aed' }} />
      </div>

      {/* Title + subtitle */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold">{report.month} Financial Report</p>
          {isCurrentMonth && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium leading-none"
              style={{ background: 'rgba(124,58,237,0.15)', color: '#7c3aed' }}
            >
              Current
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">Generated {report.generatedDate}</p>
      </div>

      {/* Financial KPI columns (hidden on small screens) */}
      <div className="hidden sm:flex items-center gap-6 text-xs">
        <div className="text-right">
          <p className="text-muted-foreground">Income</p>
          <p className="font-semibold" style={{ color: '#10b981' }}>
            PKR {report.income.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Expenses</p>
          <p className="font-semibold" style={{ color: '#ef4444' }}>
            PKR {report.expenses.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Savings</p>
          <p className="font-semibold" style={{ color: '#7c3aed' }}>
            PKR {report.savings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Download button */}
      <motion.button
        whileHover={{ scale: isCurrentMonth && !isDownloading ? 1.05 : 1 }}
        whileTap={{ scale: isCurrentMonth && !isDownloading ? 0.95 : 1 }}
        onClick={() => onDownload(report.month)}
        disabled={isDownloading}
        title={
          !isCurrentMonth
            ? 'Only the current month PDF is available for download'
            : isThisDownloading
            ? 'Downloading…'
            : 'Download PDF'
        }
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-border transition-all flex-shrink-0 ${
          isCurrentMonth && !isDownloading
            ? 'hover:bg-secondary cursor-pointer'
            : 'opacity-40 cursor-not-allowed'
        }`}
      >
        {isThisDownloading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isCurrentMonth ? (
          <Download size={14} />
        ) : (
          <Lock size={14} />
        )}
        <span className="hidden sm:inline">
          {isThisDownloading ? 'Downloading…' : 'Download'}
        </span>
      </motion.button>
    </motion.div>
  );
}
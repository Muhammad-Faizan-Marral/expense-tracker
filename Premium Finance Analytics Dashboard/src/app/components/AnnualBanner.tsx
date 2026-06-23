// src/pages/Reports/components/AnnualBanner.tsx
import { motion } from 'motion/react';
import { Calendar, BarChart3 } from 'lucide-react';

export function AnnualBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border border-border p-6 relative overflow-hidden"
      style={{ background: 'rgba(124,58,237,0.06)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: '#7c3aed' }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} style={{ color: '#7c3aed' }} />
            <h3 className="text-base font-semibold">Annual Report 2026</h3>
            <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
              Coming Dec 31
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your complete financial year summary with tax insights, investment analysis, and
            projections for 2027.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)' }}
        >
          <BarChart3 size={16} />
          Get Notified
        </motion.button>
      </div>
    </motion.div>
  );
}
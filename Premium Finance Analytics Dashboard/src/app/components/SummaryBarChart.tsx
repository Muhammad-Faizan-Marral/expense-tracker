// src/pages/Reports/components/SummaryBarChart.tsx
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartPoint } from '../../types/report';

const TOOLTIP_STYLE = {
  background: '#111116',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 10,
  color: '#fafafa',
  fontSize: 12,
};

const LEGEND = [
  { label: 'Income', color: '#7c3aed' },
  { label: 'Expenses', color: '#06b6d4' },
  { label: 'Savings', color: '#10b981' },
] as const;

interface Props {
  data: ChartPoint[];
}

export function SummaryBarChart({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border p-5"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <h3 className="text-sm font-semibold mb-1">6-Month Summary</h3>
      <p className="text-xs text-muted-foreground mb-5">Income vs Expenses (PKR 000s)</p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4} barSize={20}>
          <XAxis
            dataKey="month"
            tick={{ fill: '#71717a', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#71717a', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}k`}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v: number, name: string) => [
              `PKR ${(v * 1000).toLocaleString()}`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />
          <Bar dataKey="income"   fill="#7c3aed" radius={[4, 4, 0, 0]} name="income" />
          <Bar dataKey="expenses" fill="#06b6d4" radius={[4, 4, 0, 0]} name="expenses" />
          <Bar dataKey="savings"  fill="#10b981" radius={[4, 4, 0, 0]} name="savings" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-4 mt-3">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
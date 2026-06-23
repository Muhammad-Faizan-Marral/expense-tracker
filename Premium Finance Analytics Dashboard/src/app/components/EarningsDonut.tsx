// src/pages/Reports/components/EarningsDonut.tsx
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { EarningSource } from '../../types/report';

const TOOLTIP_STYLE = {
  background: '#111116',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 10,
  color: '#fafafa',
  fontSize: 12,
};

interface Props {
  data: EarningSource[];
}

export function EarningsDonut({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl border border-border p-5"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <h3 className="text-sm font-semibold mb-1">Earnings Breakdown</h3>
      <p className="text-xs text-muted-foreground mb-4">By source — YTD 2026</p>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            dataKey="value"
            strokeWidth={0}
            paddingAngle={3}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(v: number) => [`${v}%`, '']}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ background: d.color }}
            />
            <span className="text-muted-foreground truncate">{d.name}</span>
            <span className="font-semibold ml-auto">{d.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
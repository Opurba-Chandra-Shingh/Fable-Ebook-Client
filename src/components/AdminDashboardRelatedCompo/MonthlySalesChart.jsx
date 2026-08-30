'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';

function buildMonthlySeries(transactions, months = 6) {
  const now = new Date();
  const buckets = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString('en-US', { month: 'short' }), revenue: 0 });
  }

  const map = new Map(buckets.map((b) => [b.key, b]));

  transactions.forEach((t) => {
    if (t.status !== 'completed') return;
    const d = new Date(t.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (map.has(key)) map.get(key).revenue += t.amount;
  });

  return buckets.map((b) => ({ month: b.label, revenue: Number(b.revenue.toFixed(2)) }));
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] px-3 py-2 shadow-subtle">
      <p className="text-xs text-[var(--text-secondary)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--text-primary)]">${payload[0].value.toFixed(2)}</p>
    </div>
  );
}

export default function MonthlySalesChart({ transactions }) {
  const data = useMemo(() => buildMonthlySeries(transactions), [transactions]);
  const hasData = data.some((d) => d.revenue > 0);

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">Monthly Sales</h2>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <LineChartIcon size={32} className="text-[var(--text-secondary)]" />
          <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">
            Platform revenue will appear here once purchases start coming in.
          </p>
        </div>
      ) : (
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="adminRevenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2} fill="url(#adminRevenueFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

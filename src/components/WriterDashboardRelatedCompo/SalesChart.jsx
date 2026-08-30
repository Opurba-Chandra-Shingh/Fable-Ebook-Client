'use client';

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

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] px-3 py-2 shadow-subtle">
      <p className="text-xs text-[var(--text-secondary)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--text-primary)]">
        ${payload[0].value.toFixed(2)}
      </p>
    </div>
  );
}

export default function SalesChart({ data }) {
  const hasData = data && data.length > 0 && data.some((d) => d.revenue > 0);

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Sales Overview
      </h2>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <LineChartIcon size={32} className="text-[var(--text-secondary)]" />
          <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">
            Sales data will appear here once readers start purchasing your
            ebooks.
          </p>
        </div>
      ) : (
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                stroke="var(--text-secondary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--text-secondary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
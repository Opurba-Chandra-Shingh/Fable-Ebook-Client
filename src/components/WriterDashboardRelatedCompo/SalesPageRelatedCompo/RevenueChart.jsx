
// components/dashboard/writer/sales/revenue-chart.jsx
'use client';

import { useMemo, useState } from 'react';
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

const RANGE_OPTIONS = [
  { key: '7d', label: '7 Days', days: 7 },
  { key: '30d', label: '30 Days', days: 30 },
  { key: '6m', label: '6 Months', days: 182 },
  { key: '12m', label: '12 Months', days: 365 },
];

function buildDailySeries(sales, days) {
  const now = new Date();
  const buckets = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);

    d.setDate(now.getDate() - i);

    buckets.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      revenue: 0,
    });
  }

  const map = new Map(buckets.map((b) => [b.key, b]));

  sales.forEach((s) => {
    if (s.status !== 'completed') return;

    const key = s.date.slice(0, 10);

    if (map.has(key)) {
      map.get(key).revenue += s.amount;
    }
  });

  return buckets.map((b) => ({
    month: b.label,
    revenue: Number(b.revenue.toFixed(2)),
  }));
}

function buildMonthlySeries(sales, months) {
  const now = new Date();
  const buckets = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString('en-US', {
        month: 'short',
      }),
      revenue: 0,
    });
  }

  const map = new Map(buckets.map((b) => [b.key, b]));

  sales.forEach((s) => {
    if (s.status !== 'completed') return;

    const d = new Date(s.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;

    if (map.has(key)) {
      map.get(key).revenue += s.amount;
    }
  });

  return buckets.map((b) => ({
    month: b.label,
    revenue: Number(b.revenue.toFixed(2)),
  }));
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] px-3 py-2 shadow-subtle">
      <p className="text-xs text-[var(--text-secondary)]">
        {label}
      </p>

      <p className="text-sm font-semibold text-[var(--text-primary)]">
        ${Number(payload[0].value).toFixed(2)}
      </p>
    </div>
  );
}

export default function RevenueChart({ sales = [] }) {
  /*
   * Capture the current time once during the initial render.
   *
   * This avoids calling Date.now() directly during render,
   * which triggers React's purity ESLint rule.
   */
  const [currentTime] = useState(() => Date.now());

  const earliestSaleDate = useMemo(() => {
    const completed = sales.filter(
      (s) => s.status === 'completed'
    );

    if (!completed.length) return null;

    return completed.reduce(
      (min, s) => (s.date < min ? s.date : min),
      completed[0].date
    );
  }, [sales]);

  const spanDays = earliestSaleDate
    ? Math.ceil(
        (currentTime -
          new Date(earliestSaleDate).getTime()) /
          86400000
      )
    : 0;

  const availableRanges = useMemo(
    () =>
      RANGE_OPTIONS.filter(
        (r) =>
          spanDays >= Math.min(r.days, 7) ||
          r.key === '7d'
      ),
    [spanDays]
  );

  const [range, setRange] = useState(
    availableRanges[availableRanges.length - 1]?.key || '7d'
  );

  const activeOption =
    RANGE_OPTIONS.find((r) => r.key === range) ||
    RANGE_OPTIONS[0];

  const data = useMemo(() => {
    if (
      !sales.some(
        (s) => s.status === 'completed'
      )
    ) {
      return [];
    }

    return activeOption.key === '6m' ||
      activeOption.key === '12m'
      ? buildMonthlySeries(
          sales,
          activeOption.key === '6m' ? 6 : 12
        )
      : buildDailySeries(
          sales,
          activeOption.days
        );
  }, [sales, activeOption]);

  const hasData = data.some(
    (d) => d.revenue > 0
  );

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
          Revenue Overview
        </h2>

        {sales.length > 0 && (
          <div className="flex gap-1 rounded-full border border-[var(--border)] bg-[var(--background-secondary)] p-1">
            {availableRanges.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setRange(opt.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === opt.key
                    ? 'bg-[var(--surface)] text-[var(--accent)] shadow-subtle'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <LineChartIcon
            size={32}
            className="text-[var(--text-secondary)]"
          />

          <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">
            Sales data will appear here once readers start purchasing your ebooks.
          </p>
        </div>
      ) : (
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="salesRevenueFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--accent)"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--accent)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="3 3"
              />

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

              <Tooltip
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#salesRevenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

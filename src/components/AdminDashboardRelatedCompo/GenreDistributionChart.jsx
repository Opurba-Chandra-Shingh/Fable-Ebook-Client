'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#C2703D', '#8B7355', '#A3785A', '#D4A373', '#6B4F3B', '#E0B589', '#9C6644', '#B08968'];

export default function GenreDistributionChart({ genreDistribution }) {
  const hasData = genreDistribution?.length > 0;

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">Genre Distribution</h2>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <PieChartIcon size={32} className="text-[var(--text-secondary)]" />
          <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">
            Genre breakdown will appear once ebooks are published.
          </p>
        </div>
      ) : (
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genreDistribution}
                dataKey="count"
                nameKey="genre"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {genreDistribution.map((entry, index) => (
                  <Cell key={entry.genre} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  fontSize: '13px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

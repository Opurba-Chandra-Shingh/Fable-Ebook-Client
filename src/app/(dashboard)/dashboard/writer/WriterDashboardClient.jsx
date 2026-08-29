// components/dashboard/writer/writer-dashboard-client.jsx
'use client';

import QuickActions from "@/components/WriterDashboardRelatedCompo/QuickActions";
import RecentSales from "@/components/WriterDashboardRelatedCompo/RecentSales";
import SalesChart from "@/components/WriterDashboardRelatedCompo/SalesChart";
import StatCards from "@/components/WriterDashboardRelatedCompo/StatCards";
import TopEbooks from "@/components/WriterDashboardRelatedCompo/TopEbooks";

// import { useCallback, useEffect, useState } from 'react';

// import { getWriterDashboard } from '@/lib/api';










// lib/dummy-writer-dashboard.js
// Temporary dummy data — matches the shape returned by getWriterDashboard()
// Use this to preview StatCards, QuickActions, SalesChart, TopEbooks, RecentSales
// before the real /api/dashboard/writer endpoint is ready.

export const dummyWriterDashboard = {
  stats: {
    totalEbooks: 9,
    publishedEbooks: 7,
    totalSales: 342,
    totalRevenue: 2148.75,
  },

  monthlyRevenue: [
    { month: 'Mar', revenue: 120.5 },
    { month: 'Apr', revenue: 210.0 },
    { month: 'May', revenue: 165.25 },
    { month: 'Jun', revenue: 298.0 },
    { month: 'Jul', revenue: 350.5 },
    { month: 'Aug', revenue: 410.0 },
  ],

  topEbooks: [
    {
      id: 'ebook_1',
      title: 'Glasshouse Kingdom',
      coverImage: '/images/books/glasshouse-kingdom.jpg',
      sales: 128,
      revenue: 1088.0,
      status: 'Published',
    },
    {
      id: 'ebook_2',
      title: 'The Weight of Almost',
      coverImage: '/images/books/weight-of-almost.jpg',
      sales: 96,
      revenue: 624.0,
      status: 'Published',
    },
    {
      id: 'ebook_3',
      title: 'Slow Craft',
      coverImage: '/images/books/slow-craft.jpg',
      sales: 74,
      revenue: 517.06,
      status: 'Published',
    },
    {
      id: 'ebook_4',
      title: 'Nine Minutes Past',
      coverImage: null,
      sales: 12,
      revenue: 123.0,
      status: 'Draft',
    },
  ],

  recentSales: [
    {
      id: 'txn_1',
      ebookTitle: 'Glasshouse Kingdom',
      buyerName: 'Hannah Beaumont',
      date: '2026-08-27',
      amount: 8.75,
    },
    {
      id: 'txn_2',
      ebookTitle: 'The Weight of Almost',
      buyerName: 'Theodore Vance',
      date: '2026-08-26',
      amount: 6.5,
    },
    {
      id: 'txn_3',
      ebookTitle: 'Slow Craft',
      buyerName: 'Elias Crowe',
      date: '2026-08-25',
      amount: 6.99,
    },
    {
      id: 'txn_4',
      ebookTitle: 'Glasshouse Kingdom',
      buyerName: 'Nadia Rahman',
      date: '2026-08-24',
      amount: 8.75,
    },
    {
      id: 'txn_5',
      ebookTitle: 'The Weight of Almost',
      buyerName: 'Amara Osei',
      date: '2026-08-22',
      amount: 6.5,
    },
  ],
};

// Extra export for testing the chart's empty state
export const dummyWriterDashboardEmpty = {
  stats: {
    totalEbooks: 3,
    publishedEbooks: 2,
    totalSales: 0,
    totalRevenue: 0,
  },
  monthlyRevenue: [],
  topEbooks: [],
  recentSales: [],
};







export default function WriterDashboardClient() {
//   const [state, setState] = useState({ status: 'loading', data: null });

const { stats, monthlyRevenue, topEbooks, recentSales } = dummyWriterDashboard;

//   const load = useCallback(async () => {
//     setState({ status: 'loading', data: null });
//     try {
//       const data = await getWriterDashboard();
//       setState({ status: 'ready', data });
//     } catch {
//       setState({ status: 'error', data: null });
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   if (state.status === 'loading') {
//     return (
//       <div className="space-y-8">
//         <StatCardsSkeleton />
//         <ChartSkeleton />
//         <ListSkeleton rows={3} />
//       </div>
//     );
//   }

//   if (state.status === 'error') {
//     return <DashboardError onRetry={load} />;
//   }

//   const { stats, monthlyRevenue, topEbooks, recentSales } = state.data;

//   if (stats.totalEbooks === 0) {
//     return <EmptyDashboard />;
//   }

  return (
    <div className="space-y-8">
      <StatCards stats={stats} />
      <QuickActions />
      <SalesChart data={monthlyRevenue} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopEbooks books={topEbooks} />
        <RecentSales sales={recentSales} />
      </div>
    </div>
  );
}
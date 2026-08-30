'use client';

import QuickActions from "@/components/WriterDashboardRelatedCompo/QuickActions";
import RecentSales from "@/components/WriterDashboardRelatedCompo/RecentSales";
import SalesChart from "@/components/WriterDashboardRelatedCompo/SalesChart";
import StatCards from "@/components/WriterDashboardRelatedCompo/StatCards";
import TopEbooks from "@/components/WriterDashboardRelatedCompo/TopEbooks";
import EmptyDashboard from "@/components/WriterDashboardRelatedCompo/EmptyDashboard";


export default function WriterDashboardClient({ stats, monthlyRevenue, topEbooks, recentSales }) {

  if (stats.totalEbooks === 0) {
    return <EmptyDashboard />;
  }

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

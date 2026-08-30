import { getAdminAnalytics, getAdminTransactions, getAllUsersAdmin } from "@/api/admin";
import AdminAnalyticsCards from "@/components/AdminDashboardRelatedCompo/AdminAnalyticsCards";
import MonthlySalesChart from "@/components/AdminDashboardRelatedCompo/MonthlySalesChart";
import GenreDistributionChart from "@/components/AdminDashboardRelatedCompo/GenreDistributionChart";
import RecentTransactions from "@/components/AdminDashboardRelatedCompo/RecentTransactions";
import RecentUsers from "@/components/AdminDashboardRelatedCompo/RecentUsers";

export const metadata = {
  title: 'Admin Dashboard — Fable',
};

export default async function AdminDashboardPage() {
  const [analytics, transactions, users] = await Promise.all([
    getAdminAnalytics(),
    getAdminTransactions(),
    getAllUsersAdmin(),
  ]);

  return (
    <div className="space-y-8">
      <AdminAnalyticsCards analytics={analytics} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MonthlySalesChart transactions={transactions} />
        <GenreDistributionChart genreDistribution={analytics.genreDistribution} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTransactions transactions={transactions} />
        <RecentUsers users={users} />
      </div>
    </div>
  );
}

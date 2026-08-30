import { redirect } from 'next/navigation';

import AdminSidebar from '@/components/AdminDashboardRelatedCompo/AdminSidebar';
import DashboardHeader from '@/components/WriterDashboardRelatedCompo/DashboardHeader';
import { getUserSession } from '@/session/session';

export default async function AdminDashboardLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect('/login?redirect=/dashboard/admin');
  }
  if (user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          user={user}
          subtitle="Manage users, ebooks, and platform-wide transactions."
          profileHref="/dashboard/admin"
        />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}
